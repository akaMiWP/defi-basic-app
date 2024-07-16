import { ethers } from "ethers";
import { useEffect } from "react";
import tokens from "../data/tokens";
import { address, dexABI, wallet } from "../domain/ContractSetup";
import { TransactionState } from "../domain/TransactionState";

export const useSwap = (
  token1: string | null,
  token2: string | null,
  token3: string | null,
  closure: (state: boolean) => void,
  showAllowSwap: boolean,
  setTransactonState: (state: TransactionState) => void
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
      setTransactonState(TransactionState.confirming);
    };

    if (token1 && token2 && token3 && showAllowSwap) {
      swapTokens(token1, token2, token3);
      closure(false);
    }
  }, [showAllowSwap]);
};
