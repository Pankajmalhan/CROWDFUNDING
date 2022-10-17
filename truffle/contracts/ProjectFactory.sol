//SPDX-License-Identifier: MIT


/*
1. Add validation for create project for each field
2. Create a event for each error
3. Complete two methods
4. Start projectid from 1000 instead of 0
*/
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Project.sol";
import {LibraryEvents} from "./Utils.sol";
/**
 * @title ProjectManagerContract
 * @author Shivam Arora
 * @dev Project Management Contract allows users to create projects and manage them
 */

 struct ProjectObj{
    uint16 projectId;
    address projectAddress;
 }

contract ProjectFactory {
    //Library
    using Counters for Counters.Counter;

    //State
    Counters.Counter private _contractId;

    //ProjectID to ContractAddress
    ProjectObj[] idToContractAddress;

    function createNewProject(
        string memory _title,
        string memory _description,
        uint256 _project_target_price,
        uint256 _projest_deadline_date_unix,
        uint256 _project_minimum_fund_price
    ) public {

        uint16 projectID = uint16(_contractId.current());
        Project project = new Project(
            projectID,
            _title,
            _description,
            _project_target_price,
            _projest_deadline_date_unix,
            _project_minimum_fund_price,
            msg.sender
        );

        idToContractAddress.push(ProjectObj(projectID,address(project)));
        _contractId.increment();

        // emit event for project creation 
        emit LibraryEvents.ProjectStarted(projectID,
            _title,
            _description,
            _project_target_price,
            _projest_deadline_date_unix,
            _project_minimum_fund_price,
            msg.sender);
    }

    function getProjectLists() public view returns (ProjectObj[] memory){
        return idToContractAddress;
    }

    // function getProjectInfoById(uint16 projectId) view returns(Project memory){

    // }

    // function getProjectInfoByAddress(address _address) view returns(Project memory){
        
    // }
}