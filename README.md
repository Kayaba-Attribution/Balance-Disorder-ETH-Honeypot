# Balance Disorder ETH Honeypot

This project demonstrates a basic Hardhat use case.
Comes with the honeypot contract, and showcases its workflow using HardHat test.
### Balance Disorder:
- The honeypot works by making the victim think that if they send some ETH they will get their ETH + contract Balance. 
- But the balance is incremented with the transaction value, before the execution of the smart contract takes place.
- Thus the condition will never be true.
```
if(msg.value >= address(this).balance){

    payable(_reciever).transfer(address(this).balance + msg.value);

}
```
### To test it:

Clone the repo and run:

```
npm install --save-dev hardhat
npx hardhat compile
npx hardhat test
```

Inspiration from the paper: https://www.usenix.org/system/files/sec19-torres.pdf
