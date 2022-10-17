//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error SpendMoreEth();
error NotProjectOwner();
error NotInAwaitingFunding();
error NotFundingComplete();

/**
 * @title ProjectManagerContract
 * @author Shivam Arora
 * @dev Project Management Contract allows users to create projects and manage them
 */


 struct FundRaiser{
    address addressId;
    uint16 amount;
 } 

contract Project is Ownable {
    //State
    enum State {
        AWAITING_FUNDING,
        FUNDING_COMLPETE
    }

    // Project variables
    uint16 public projectID;
    uint32 public target_price;
    uint256 public deadline_date_unix;
    uint256 public minimum_fund_price_in_eth;
    string public title;
    string public description;
    address public projectOwner;
    State public projectState;

    //ProjectId to Total Funding Amount
    uint256 public totalFundingAmount;

    //Array to store all the funders
    FundRaiser[] public project_funders;

    //Constructor
    constructor(
        uint16 _projectID,
        string memory _title,
        string memory _description,
        uint256 _project_target_price,
        uint256 _projest_deadline_date_unix,
        uint256 _project_minimum_fund_price,
        address _projectOwner
    ) {
        projectID=_projectID;
        target_price=_project_target_price;
        deadline_date_unix=_projest_deadline_date_unix;
        minimum_fund_price_in_eth=_project_minimum_fund_price;
        title=_title;
        description=_description;
        projectState=State.AWAITING_FUNDING;
        projectOwner=_projectOwner;
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

    function markFundingComplete(uint256 _projectID) public onlyOwner {
        // stateHistory[_projectID] = State.FUNDING_COMLPETE;
    }

    function withdraw(uint256 _projectID) public payable {
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
        fund(0);
    }

    receive() external payable {
        fund(0);
    }

    // //View Functions
    // function getProject(uint256 _projectID)
    //     public
    //     view
    //     returns (string memory)
    // {
    //     return idToProject[_projectID].title;
    // }
}
