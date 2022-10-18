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
import {LibraryEvents, LibraryErrors} from "./Utils.sol";
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

    //ProjectID to ContractAddress
    mapping(uint256 => address) projectIdToAddress;

    // Array to store all projects
    ProjectEntity[] private projects;

    function createNewProject(
        string memory _title,
        string memory _description,
        uint32 _project_target_price,
        uint32 _projest_deadline_date_unix,
        uint32 _project_minimum_fund_price
    ) public {
        // LibraryErrors.checkForMinumumFund(_project_target_price,_project_minimum_fund_price);
        require(
            _project_target_price > _project_minimum_fund_price,
            "Target price should not be less than minimum fund price"
        );
        require(
            block.timestamp > _projest_deadline_date_unix,
            "Deadline is already passed"
        );

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

        projectIdToAddress[projectID] = address(project);
        projects.push(ProjectEntity(projectID, address(project)));
        _contractId.increment();

        // emit event for project creation
        emit LibraryEvents.ProjectStarted(
            projectID,
            _title,
            _description,
            _project_target_price,
            _projest_deadline_date_unix,
            _project_minimum_fund_price,
            msg.sender
        );
    }

    function getProjectLists() public view returns (ProjectEntity[] memory) {
        return projects;
    }

    function getProjectInfoById(uint16 _projectId)
        public
        view
        returns (string memory _title, string memory _description)
    {
        address payable projectAddress = payable(
            projectIdToAddress[_projectId]
        );
        return Project(projectAddress).getProjectDetails();
    }

    function getProjectInfoByAddress(address _address)
        public
        view
        returns (string memory _title, string memory _description)
    {
        return Project(payable(_address)).getProjectDetails();
    }
}
