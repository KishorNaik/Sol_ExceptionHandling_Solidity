import { expect } from "chai";
import { ethers } from "hardhat";

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });


describe("Exception-Handling-Example", function () {
  it("#Test1 - Exception-Success-Failed", async function () {
    
    try
    {
      const [owner,add1,add2]=await ethers.getSigners();

      const Contract1 = await ethers.getContractFactory("CalledContract");
      const contract1 = await Contract1.deploy();
      await contract1.deployed();


      const Contract2 = await ethers.getContractFactory("TryCatcher");
      const contract2 = await Contract2.deploy();
      await contract2.deployed();

      // Assert
      let value:number= await contract2.callStatic.execute(2,2); // Get return Value from Non Pure and View function to use callStatic method
      console.log(`Value => ${value}`);

      let tx=await contract2.execute(2,2); // Get Transaction from non View and Pure Function

      
      // Iterate Transaction Logs
      const receipt=await tx.wait();

      for (const event of receipt.events) {
        console.log(`Event ${event.event} with args ${event.args}`);
      }

      // const tx = await contract.transfer(...args); // 100ms
      // const rc = await tx.wait(); // 0ms, as tx is already confirmed
      // const event = rc.events.find(event => event.event === 'Transfer');
      // const [from, to, value] = event.args;   
      // console.log(from, to, value); 

      // Test
      expect(true).to.equal(true);
    }
    catch(ex)
    {
      console.log((<Error>ex).message);
      expect(false).to.equal(true);
    }
  });



});