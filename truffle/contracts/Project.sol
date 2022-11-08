//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

/// Target Value needs to be greater than MINIMUM_TARGET_AMOUNT.
error NeedToSetHigherTarget(uint256 given, uint256 required);

/// Min Fund Value needs to be greater than MINIMUM_FUND_RAISE_AMOUNT.
error NeedToSetHigherMinFundPrice(uint256 given, uint256 required);

// Funding needs to be greater than set amount
error SpendMoreEth();

// State needs to be awaiting in order to fund project
error NotInAwaitingFunding();

// Only Owner can Withdraw
error NotProjectOwner();

// Can only withdraw after marked as complete
error NotFundingComplete();

/**
 * @title ProjectManagerContract
 * @author Shivam Arora
 * @dev Project Management Contract allows users to create projects and manage them
 */

contract Project is Ownable {
    //State
    enum State {
        AWAITING_FUNDING,
        FUNDING_COMLPETE,
        OVER
    }

    // Validation Constants
    uint256 private constant MINUMUM_TARGET_AMOUNT = 10 ether;
    uint256 private constant MINIMUM_FUND_RAISE_AMOUNT = 1 ether;

    // Project variables
    string public ipfs_cid;
    uint16 public immutable i_projectID;
    uint256 public immutable i_target_price;
    uint256 public immutable i_deadline_date_unix;
    uint256 public immutable i_minimum_fund_price_in_eth;
    string public s_title;
    string public s_description;
    address public immutable i_projectOwner;
    uint256 public s_totalFundingAmount;
    State public s_projectState;

    //Store information about amount a fund raiser has raised
    mapping(address => uint256) public addressToAmount;
    address[] public project_funders;

    //Constructor
    constructor(
        uint16 _projectID,
        string memory _title,
        string memory _description,
        uint256 _project_target_price,
        uint256 _project_deadline_date_unix,
        uint256 _project_minimum_fund_price,
        address _projectOwner,
        string memory _cid
    ) {
        //Validate
        if (_project_target_price * 1 ether <= MINUMUM_TARGET_AMOUNT) {
            revert NeedToSetHigherTarget(
                _project_target_price,
                MINUMUM_TARGET_AMOUNT
            );
        }
        if (
            _project_minimum_fund_price * 1 ether <= MINIMUM_FUND_RAISE_AMOUNT
        ) {
            revert NeedToSetHigherMinFundPrice(
                _project_minimum_fund_price,
                MINIMUM_FUND_RAISE_AMOUNT
            );
        }

        i_projectID = _projectID;
        i_target_price = _project_target_price * 1 ether;
        i_deadline_date_unix = _project_deadline_date_unix;
        i_minimum_fund_price_in_eth = _project_minimum_fund_price * 1 ether;
        s_title = _title;
        s_description = _description;
        s_projectState = State.AWAITING_FUNDING;
        i_projectOwner = _projectOwner;
        ipfs_cid = _cid;
    }

    //Functions
    function fund(address sender) public payable returns(uint256) {
        if (msg.value <= i_minimum_fund_price_in_eth) {
            revert SpendMoreEth();
        }
        if (s_projectState != State.AWAITING_FUNDING) {
            revert NotInAwaitingFunding();
        }

        project_funders.push(sender);
        addressToAmount[sender] = msg.value;
        s_totalFundingAmount += msg.value;
        return (s_totalFundingAmount); 
    }

    function markFundingComplete() public onlyOwner {
        s_projectState = State.FUNDING_COMLPETE;
    }

    function withdraw() public payable {
        if (msg.sender != i_projectOwner) {
            revert NotProjectOwner();
        }
        if (s_projectState != State.FUNDING_COMLPETE) {
            revert NotFundingComplete();
        }
        //since reading from storage is expensive, we only do it once
        address[] memory m_funders = project_funders;
        for (
            uint256 funderIndex = 0;
            funderIndex < m_funders.length;
            funderIndex++
        ) {
            address funder = m_funders[funderIndex];
            addressToAmount[funder] = 0;
        }

        (bool callSuccess, ) = payable(msg.sender).call{
            value: s_totalFundingAmount
        }("");
        require(callSuccess, "Call failed");

        s_totalFundingAmount = 0;
        project_funders = new address[](0);
        s_projectState = State.OVER;
    }

    //if someone sends this contract ETH without calling the fund function
    // fallback() external payable {
    //     fund();
    // }

    // receive() external payable {
    //     fund();
    // }

    // View Functions
    function getProjectDetails()
        public
        view
        returns (string memory _title, string memory _description)
    {
        return (s_title, s_description);
    }
}
