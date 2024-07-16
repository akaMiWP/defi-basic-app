import { ethers } from "ethers";
import { useEffect } from "react";
import tokens from "../data/tokens";
import { address, dexABI, wallet } from "../domain/ContractSetup";

export const useSwap = (
  token1: string | null,
  token2: string | null,
  token3: string | null,
  deps: unknown[]
) => {
  useEffect(() => {
    const swapTokens = async (
      token1: string,
      token2: string,
      input: string
    ) => {
      console.log("Waitng for swap");
      const dexContract = new ethers.Contract(address, dexABI, wallet);
      const txResponse = await dexContract.swapTokens(
        tokens[token1],
        tokens[token2],
        ethers.utils.parseEther(input)
      );
      console.log("Swap Transaction Response:", txResponse);
    };

    if (token1 && token2 && token3) {
      swapTokens(token1, token2, token3);
    }
  }, [...deps]);
};
