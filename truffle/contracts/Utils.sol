//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library LibraryEvents {
    //Events
    event ProjectStarted(
        uint16 _projectID,
        string _title,
        string _description,
        uint256 _project_target_price,
        uint256 _projest_deadline_date_unix,
        uint256 _project_minimum_fund_price,
        address _projectOwner
    );
}

library LibraryErrors {
    //Events
    error SpendMoreEth();
    error NotProjectOwner();
    error NotInAwaitingFunding();
    error NotFundingComplete();
}
