const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("HoneyPot Testing", function () {
  let ETH_HONEYPOT_FACTORY;
  let eth_honeypot;
  let owner;
  let signers;
 

  it("Should deploy the contract and check the owner", async function () {
    signers = await ethers.getSigners();
    owner = signers[0];
    
    ETH_HONEYPOT_FACTORY = await ethers.getContractFactory("ETH_Giveaway");
    eth_honeypot = await ETH_HONEYPOT_FACTORY.connect(owner).deploy(owner.address, {value: 1000});

    await eth_honeypot.deployed();

    expect(await eth_honeypot.owner()).to.equal(owner.address);
    console.log("HoneyPot owner is: ", owner.address)

    for(var i = 1; i <= 10; i++){
      console.log("HoneyPot victim "+ i + " is: ", signers[i].address)
    }

    

  });

  it("Check contract Balance is 1000", async function(){
    expect(await eth_honeypot.viewGameBalance()).to.equal(1000);
  });

  it("Victims Deposits 1000 each, honeypot balance is 11000", async function(){
    for(var i = 1; i <= 10; i++){
      await eth_honeypot.connect(signers[0]).giveway(signers[i].address, {value:1000})
    }

    expect(await eth_honeypot.viewGameBalance()).to.equal(11000);
  })

  it("Owner withdraws all the ETH, honeypot balance is 0", async function(){
    await eth_honeypot.connect(owner).withdraw();
    expect(await eth_honeypot.viewGameBalance()).to.equal(0);
  })

  

});
