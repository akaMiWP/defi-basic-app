## DeFi basic application

### Overview

![Screenshot 2567-07-20 at 14 16 15](https://github.com/user-attachments/assets/e3d3161c-a7a4-4ce9-9ea0-36486f5b0cf4)

Here is a high level overview illustrating flows happen in the application
- there are three parts of deployed contracts: `DeFi`, `ERC20` and `AggregatorV3` contracts
- client only communicate with `DeFi` and `ERC20` contracts
- For `ERC20` contracts, client will call to check for current balances and allowances assigned to `DeFi` contract address and to approve allowances
- For `DeFi` contract, this is a brain of the full stack application that allows EOAs to get `price feed of a token pair` and to `swap ERC20 tokens`


### Disclaimer
- the project was only built for the educational purpose
- this project only include the client part
- the smart contract part could be found here https://github.com/akaMiWP/defi-basic-smart-contract

### Installation
```
npm run dev
```
