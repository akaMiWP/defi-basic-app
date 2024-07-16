import { BigNumberish, ethers } from "ethers";
import tokens from "../data/tokens";

// const provider = new ethers.providers.AlchemyProvider(
//   "sepolia",
//   import.meta.env.VITE_ALCHEMY_API_KEY
// );

const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");
const address = import.meta.env.VITE_CONSUMER_V3_ADDRESS;
const wallet = provider.getSigner();

const dexABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "ticker",
            type: "string",
          },
          {
            internalType: "address",
            name: "aggregatorAddress",
            type: "address",
          },
        ],
        internalType: "struct DefiConsumerV3.PriceFeedPair[]",
        name: "priceFeedPairs",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "depositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        internalType: "address",
        name: "token2",
        type: "address",
      },
    ],
    name: "getPriceFeedFromPair",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "priceFeeds",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        internalType: "address",
        name: "token2",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "swapTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const dexContract = new ethers.Contract(address, dexABI, wallet);

export const swapTokens = async (
  token1: string,
  token2: string,
  input: string
) => {
  console.log("Waitng for swap");
  const txResponse = await dexContract.swapTokens(
    tokens[token1],
    tokens[token2],
    ethers.utils.parseEther(input)
  );
  console.log("Swap Transaction Response:", txResponse);
};
