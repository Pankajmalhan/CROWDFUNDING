//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Project.sol";
import {LibraryEvents} from "./Utils.sol";

/**
 * @title ProjectManagerContract
 * @author Shivam Arora
 * @dev Project Management Contract allows users to create projects and manage them
 */

 struct ProjectEntity {
    uint16 projectId;
    address projectAddress;
 }

contract ProjectFactory {

    //Library
    using Counters for Counters.Counter;

    //State
    Counters.Counter private _contractId;

    // Array to store all projects
    ProjectEntity[] private projects;

    //initialise counter
    function initialiseCounter() public {
        _contractId.initialise();
    }

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

        projects.push(ProjectEntity(projectID, address(project)));
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

    function getProjectLists() public view returns (ProjectEntity[] memory){
        return projects;
    }

    function getProjectInfoById(uint16 _projectId) public view returns (string memory _title, string memory _description) {
        for(uint i=0; i<projects.length;i++){
            if(projects[i].projectId == _projectId){
                address payable projectAddress = payable(projects[i].projectAddress);
                return Project(projectAddress).getProjectDetails();
            }
        }
    }

    function getProjectInfoByAddress(address _address) public view returns (string memory _title, string memory _description) {
        return Project(payable(_address)).getProjectDetails();
    }
}