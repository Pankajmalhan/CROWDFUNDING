pragma solidity >=0.5.0 < 0.9.0;
    
struct Request{

    string description;
    address payable recipient;
    uint value;
    bool completed;
    uint noOfVoters;
    mapping(address=>bool) voters;

    }

contract CrowdFunding{
    address public manager; 
    uint public minumumDonation;
    uint public deadline;
    uint public totalAmmountToBeRaised;
    uint public raisedAmount;
    uint public totalDonators;
    
    //map ping of contibutors addresses & fund gathering request's from contributers
    mapping(address=>uint) public contributors; 
    mapping(uint=>Request) public requests;

    //create new request for Voting 
    uint public numRequests;

    constructor(uint _totalAmmountToBeRaised,uint _deadline){
        totalAmmountToBeRaised=_totalAmmountToBeRaised; 
        //Eg: 10sec + 3600sec (60*60)
        deadline=block.timestamp+_deadline; 
        minumumDonation=100 wei;
        manager=msg.sender; 
    }
    
    //This function will be resposible for getning donations 
    function donateMoney() public payable{
        //require will check if Time is passed or minimum ammount is donated
        require(block.timestamp <= deadline || totalAmmountToBeRaised <= raisedAmount ,"Deadline has passed");
        require(msg.value >=minumumDonation ,"Minimum Contribution is not met");
    
        if(contributors[msg.sender]==0){
            totalDonators++;
        }
        contributors[msg.sender]+=msg.value;
        raisedAmount+=msg.value;
    }
//     function balance() public returns (uint256){
//     return payable(address(this)).balance;
//   }
    //Contract balance
    function checkContractBalance() public view returns(uint){
        // web3.eth.getBalance()
        return address(this).balance;
    }

    //to raise request for voting to get Ether or something
    function createRequestsForVoting(string memory _description,address payable _recipient,uint _value) public onlyManger{
        //newRequest is just to take ref for the particular request
        Request storage newRequest = requests[numRequests];
        numRequests++;
        newRequest.description=_description;
        newRequest.recipient=_recipient;
        newRequest.value=_value;
        newRequest.completed=false;
        newRequest.noOfVoters=0;
    }

    
    //voting Func
    function castVote(uint _requestNo) public{
        //check if contributor has donated or is it a part of contract
        require(contributors[msg.sender]>0,"YOu must be contributor");
        Request storage thisRequest=requests[_requestNo];
        //Check if user or contributor voted
        require(thisRequest.voters[msg.sender]==false,"You have already voted");
        thisRequest.voters[msg.sender]=true;
        thisRequest.noOfVoters++;
    }

    //This function will transcast the ammount after voting is successfully done : Restricted to Manager only
    function makePayment(uint _requestNo) public onlyManger{
        require(raisedAmount>=totalAmmountToBeRaised);
        Request storage thisRequest=requests[_requestNo];
        //check weather transaction is done after voting or not
        require(thisRequest.completed==false,"The request has been completed");
        require(thisRequest.noOfVoters > totalDonators/2,"Majority does not support");
        thisRequest.recipient.transfer(thisRequest.value);
        thisRequest.completed=true;
    }

    //this modifier restrict other except contract manager for transaction or in required cases
    modifier onlyManger(){require(msg.sender==manager,"Only manager can calll this function"); _;}
    
}

