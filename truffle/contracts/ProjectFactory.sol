//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Project.sol";

/**
 * @title ProjectManagerContract
 * @author Shivam Arora
 * @dev Project Management Contract allows users to create projects and manage them
 */

contract ProjectFactory is Ownable {
    //Library
    using Counters for Counters.Counter;

    //State
    Counters.Counter private _contractId;

    struct ProjectEntity {
        uint16 projectId;
        address projectAddress;
    }

    // Array to store all projects
    ProjectEntity[] private projects;

    event ProjectStarted(
        uint16 _projectID,
        string _title,
        string _description,
        uint256 _project_target_price,
        uint256 _projest_deadline_date_unix,
        uint256 _project_minimum_fund_price,
        address _projectOwner,
        address _contractAddress,
        string _ipfs_cid
    );

    //Functions
    function createNewProject(
        string memory _title,
        string memory _description,
        uint256 _project_target_price,
        uint256 _projest_deadline_date_unix,
        uint256 _project_minimum_fund_price,
        string memory _ipfs_cid
    ) public {
        uint16 projectID = uint16(_contractId.current());
        Project project = new Project(
            projectID,
            _title,
            _description,
            _project_target_price,
            _projest_deadline_date_unix,
            _project_minimum_fund_price,
            msg.sender,
            _ipfs_cid
        );

        projects.push(ProjectEntity(projectID, address(project)));
        _contractId.increment();

        // emit event for project creation
        emit ProjectStarted(
            projectID,
            _title,
            _description,
            _project_target_price,
            _projest_deadline_date_unix,
            _project_minimum_fund_price,
            msg.sender,
            address(project),
            _ipfs_cid
        );
    }

    //State Functions
    function markProjectFundingComplete(address _projectAddress)
        public
        onlyOwner
    {
        Project(payable(_projectAddress)).markFundingComplete();
    }

    //View Functions
    function getProjectLists() public view returns (ProjectEntity[] memory) {
        return projects;
    }

    function getProjectInfoById(uint16 _projectId)
        public
        view
        returns (string memory _title, string memory _description)
    {
        for (uint i = 0; i < projects.length; i++) {
            if (projects[i].projectId == _projectId) {
                address payable projectAddress = payable(
                    projects[i].projectAddress
                );
                return Project(projectAddress).getProjectDetails();
            }
        }
    }

    function getProjectInfoByAddress(address _address)
        public
        view
        returns (string memory _title, string memory _description)
    {
        return Project(payable(_address)).getProjectDetails();
    }

    function getCurrentProjectID() public view returns (uint16) {
        uint16 id = uint16(_contractId.current());
        return id;
    }
}
