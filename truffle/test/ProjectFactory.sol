// //SPDX-License-Identifier: MIT

// pragma solidity ^0.8.9;

// import "truffle/Assert.sol";
// import "truffle/DeployedAddresses.sol";
// import "../contracts/ProjectFactory.sol";
// import "../contracts/Project.sol";

// contract TestProjectFactory {
//     ProjectFactory public projectFactoryObj;

//     function beforeEach() public {
//         projectFactoryObj = new ProjectFactory();
//     }

//     function testCreateNewPorject() public {
//         ProjectEntity[] memory projetList = projectFactoryObj.getProjectLists();
//         Assert.equal(projetList.length, 0, "it is not initial state");
//     }

//     function testCreatNewProject() public {

//         string memory _title = "title";
//         string memory _description = "this is my first project";
//         uint32 _project_target_price = 1200000;
//         uint32 _projest_deadline_date_unix = 12000000;
//         uint32 _project_minimum_fund_price = 12000;

//         projectFactoryObj.createNewProject(
//             _title,
//             _description,
//             _project_target_price,
//             _projest_deadline_date_unix,
//             _project_minimum_fund_price
//         );

//         ProjectEntity[]  memory projects = projectFactoryObj.getProjectLists();
//         Assert.equal(projects.length, 1, "Projects length is not equal to 1");


//        (string memory ret_title, string memory ret_description) = projectFactoryObj.getProjectInfoByAddress(projects[0].projectAddress);

//         Assert.equal(ret_title, _title, "Project title is not correct");
//         Assert.equal(ret_description, _description, "Project description is not correct");
//     }
// }
