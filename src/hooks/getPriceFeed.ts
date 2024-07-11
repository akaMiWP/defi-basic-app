import { ethers } from "ethers";

// const provider = new ethers.providers.AlchemyProvider(
//   "sepolia",
//   import.meta.env.VITE_ALCHEMY_API_KEY
// );

const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");

const address = import.meta.env.VITE_CONSUMER_V3_ADDRESS;
const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "priceFeed",
        type: "string",
      },
    ],
    name: "getChainlinkDataFeedLatestAnswer",
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
];
const contract = new ethers.Contract(address, abi, provider);

export default async function getPriceFeed(sell: string, buy: string) {
  try {
    const priceFeed: string = sell + "/" + buy;
    const priceInBigInt = await contract.getChainlinkDataFeedLatestAnswer(
      priceFeed
    );
    const price = ethers.utils.formatEther(priceInBigInt);
    console.log(priceFeed, price);
    return price;
  } catch (error) {
    console.log(error);
  }
}
