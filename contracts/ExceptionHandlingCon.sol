
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CalledContract{
   
   function getValue(uint _value1, uint _value2) public pure returns (uint){
      revert("Some Revert");
      //return _value1+_value2;
   }

}


contract TryCatcher{

   CalledContract private externalContract;

   constructor(){
      externalContract=new CalledContract();
   }

   // Store Event Data in the blokchain in the form of Transaction Logs.
   event SuccessEvent(address indexed fromAddress,bytes message);
   event ErrorEvent(address indexed fromAddress,bytes message);

   function test() public pure returns(uint){
      return 2;
   }

   function execute(uint _value1,uint _value2) public returns(uint){

      // Try Catch of External Call Only
      try externalContract.getValue(_value1,_value2) returns (uint x) {
         emit SuccessEvent(msg.sender, "success");
         console.log("Success");
         return x * 100;
      }
      catch(bytes memory message){
         console.log("Fail");
         emit ErrorEvent(msg.sender,message);
         return 0;
      }

   }
   
}