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
    event priceError(uint256 _project_target_price, uint256 _project_minimum_fund_price);
    event wrongDeadline(uint256 _projest_deadline_date_unix);

    //functions
     function checkTitle(string memory str) internal pure returns (bool){
        bytes memory b = bytes(str);
        if(b.length > 50) return false;

        for(uint16 i; i<b.length; i++){
            bytes1 char = b[i];

            if(
                !(char >= 0x30 && char <= 0x39) && //9-0
                !(char >= 0x41 && char <= 0x5A) && //A-Z
                !(char >= 0x61 && char <= 0x7A) && //a-z
                !(char == 0x2E) //.
            )
            return false;
        }

        return true;
    }

    function checkDes(string memory str) internal pure returns(bool){
        bytes memory b = bytes(str);
        if(b.length > 100) return false;
        else return true;
    }

    function checkTarget(uint256 _target) internal pure returns(bool){
        if(_target<=0) return false;
        else return true;
    }

    function checkDeadline(uint256 _deadline)internal view returns(bool){
        uint256 current=block.timestamp+(7*24*60*60*1000);
        if(current>_deadline) return false;
        else return true;
    }

    function checkMin_MaxContribution(uint256 _target,uint256 _min) internal pure returns(bool){
        if(_target<_min) return false;
        else return true;
    }
    
    error SpendMoreEth();
    error NotProjectOwner();
    error NotInAwaitingFunding();
    error NotFundingComplete();
}
