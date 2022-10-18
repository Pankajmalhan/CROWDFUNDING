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

library HelperFunctions {
    //Function to find string of given string
    function strlen(string memory s) internal pure returns (uint256) {
        uint256 len;
        uint256 i = 0;
        uint256 bytelength = bytes(s).length;
        for (len = 0; i < bytelength; len++) {
            bytes1 b = bytes(s)[i];
            if (b < 0x80) {
                i += 1;
            } else if (b < 0xE0) {
                i += 2;
            } else if (b < 0xF0) {
                i += 3;
            } else if (b < 0xF8) {
                i += 4;
            } else if (b < 0xFC) {
                i += 5;
            } else {
                i += 6;
            }
        }
        return len;
    }

}