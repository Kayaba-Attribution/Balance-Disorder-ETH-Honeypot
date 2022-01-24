const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("HoneyPot Testing", function () {

  let eth_honeypot;
  let deployer, bob, alice, adam;
 
  beforeEach("Should deploy the contract with 1 ETH and check the owner", async function () {
    [deployer, bob, alice, adam] = await ethers.getSigners();
    
    const ETH_HONEYPOT_FACTORY = await ethers.getContractFactory("ETH_Giveaway");
    eth_honeypot = await ETH_HONEYPOT_FACTORY.connect(deployer).deploy(deployer.address, {value: 100});
    await eth_honeypot.deployed();

    expect(await eth_honeypot.owner()).to.equal(deployer.address);
    console.log("HoneyPot owner is: ", deployer.address)

    // for(var i = 1; i <= 10; i++){
    //   console.log("HoneyPot victim "+ i + " is: ", signers[i].address)
    // }

  });

  it("Check contract Balance is 1 ETH", async function(){
    expect(await eth_honeypot.viewGameBalance()).to.equal(100);
  });

  it("Bob tries to take the giveaway", async function(){
    // See the giveaway current balance
    let giveawayBalance = (await eth_honeypot.viewGameBalance())
    console.log(`Giveaway has ${giveawayBalance} ETH`)
    // Calculate the amount to send (actual balance + )
    let sendAmount = (+giveawayBalance + +1).toString()
    // Bob decides to take the eth by sending the balance + 1
    await eth_honeypot.connect(bob).giveway(bob.address, {value: sendAmount})
    // Bob expects to recieve "address(this).balance + msg.value"
    // In our current setting 100+101, the giveaway will be left with 0
    expect(await eth_honeypot.viewGameBalance()).to.equal("0")

  })



  // it("Victims Deposits 1000 each, honeypot balance is 11000", async function(){
  //   for(var i = 1; i <= 10; i++){
  //     await eth_honeypot.connect(signers[i]).giveway(signers[i].address, {value:1000})
  //   }
  //   expect(await eth_honeypot.viewGameBalance()).to.equal(11000);
  // })

  // it("Owner withdraws all the ETH, honeypot balance is 0", async function(){
  //   await eth_honeypot.connect(owner).withdraw();
  //   expect(await eth_honeypot.viewGameBalance()).to.equal(0);
  // })

  

});
