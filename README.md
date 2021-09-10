# Balance Disorder ETH HoneyPot

This project demonstrates a basic Hardhat use case.
Comes with the honeypot contract, and showcases its workflow using HardHat test.
Balance Disorder:
*The honeypot works by making the victim think that if they send some ETH they will get their ETH + contract Balance. 
*But the balance is incremented with the transaction value, before the execution of the smart contract takes place.
*Thus the condition will never be true.
```
        if(msg.value >= address(this).balance){
            
            payable(_reciever).transfer(address(this).balance + msg.value);
            
        }
```

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
