//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./Utils.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error NeedToSetHigherTarget();
error InvalidTimeInput();
error InvalidCharLen();

/**
 * @title ProjectManagerContract
 * @author Shivam Arora
 * @dev Project Management Contract allows users to create projects and manage them
 */

contract Project is Ownable {
    //Library
    using HelperFunctions for string;

    //State
    enum State {
        AWAITING_FUNDING,
        FUNDING_COMLPETE
    }

    // Validation Constants
    uint256 private constant MINUMUM_TARGET_AMOUNT = 10 ether;
    uint256 private constant MINIMUM_FUND_RAISE_AMOUNT = 1 ether;
    uint256 private constant MINIMUM_CHAR_LEN = 10;
    uint256 private constant MAX_CHAR_LEN = 50;

    // Project variables
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
    mapping(address => int256) addressToAmount;

    //Constructor
    constructor(
        uint16 _projectID,
        string memory _title,
        string memory _description,
        uint256 _project_target_price,
        uint256 _project_deadline_date_unix,
        uint256 _project_minimum_fund_price,
        address _projectOwner
    ) {
        //Validate
        if(_project_target_price * 1 ether <= MINUMUM_TARGET_AMOUNT){
            revert NeedToSetHigherTarget();
        }
        if(_project_deadline_date_unix <= block.timestamp){
            revert InvalidTimeInput();
        }
        if(s_title.strlen()<=MINIMUM_CHAR_LEN || s_title.strlen()>=MAX_CHAR_LEN){
            revert InvalidCharLen();
        }
        if(s_description.strlen()<=MINIMUM_CHAR_LEN || s_description.strlen()>=MAX_CHAR_LEN){
            revert InvalidCharLen();
        }
        

        i_projectID = _projectID;
        i_target_price = _project_target_price;
        i_deadline_date_unix = _project_deadline_date_unix;
        i_minimum_fund_price_in_eth = _project_minimum_fund_price;
        s_title = _title;
        s_description = _description;
        s_projectState = State.AWAITING_FUNDING;
        i_projectOwner = _projectOwner;
    }

    //Functions
    function fund(uint256 _projectID) public payable {
        // //revert is more efficient than require
        // if (msg.value <= idToProject[_projectID].minimum_fund_price_in_eth) {
        //     revert SpendMoreEth();
        // }
        // if (stateHistory[_projectID] != State.AWAITING_FUNDING) {
        //     revert NotInAwaitingFunding();
        // }
        // projectIdToFunderAddressToAmount[_projectID][msg.sender] = msg.value;
        // project_funders[_projectID].push(msg.sender);
        // projectIdToTotalFundingAmount[_projectID] += msg.value;
    }

    function markFundingComplete() public onlyOwner {
        // stateHistory[_projectID] = State.FUNDING_COMLPETE;
    }

    function withdraw() public payable {
        // if (_projectID != addressToProjectID[msg.sender]) {
        //     revert NotProjectOwner();
        // }
        // if (stateHistory[_projectID] != State.FUNDING_COMLPETE) {
        //     revert NotFundingComplete();
        // }
        // //since reading from storage is expensive, we only do it once
        // address[] memory m_funders = project_funders[_projectID];
        // for (
        //     uint256 funderIndex = 0;
        //     funderIndex < m_funders.length;
        //     funderIndex++
        // ) {
        //     address funder = m_funders[funderIndex];
        //     projectIdToFunderAddressToAmount[_projectID][funder] = 0;
        // }
        // project_funders[_projectID] = new address[](0);
        // (bool callSuccess, ) = payable(msg.sender).call{
        //     value: projectIdToTotalFundingAmount[_projectID]
        // }("");
        // require(callSuccess, "Call failed");
    }

    //if someone sends this contract ETH without calling the fund function
    fallback() external payable {
        // fund(0);
    }

    receive() external payable {
        // fund(0);
    }

    // View Functions
    function getProjectDetails()
        public
        view
        returns (string memory _title, string memory _description)
    {
        return (title, description);
    }
}