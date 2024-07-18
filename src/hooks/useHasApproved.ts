import { ethers } from "ethers";
import tokens from "../data/tokens";
import { wallet, erc20ABI, provider, address } from "../domain/ContractSetup";
import { useEffect } from "react";
import { SwapButtonState } from "../domain/SwapButtonState";
import { isBalancesMoreThanInput } from "../domain/CalculatePrice";

export const useHasApproved = (
  tokenTicker: string | null,
  destinationTicker: string | null,
  swappingAmount: string,
  balances: string | null,
  setSwapButtonState: (state: SwapButtonState) => void,
  deps: unknown[]
) => {
  useEffect(() => {
    const hasApproved = async (tokenTicker: string, swappingAmount: string) => {
      if (
        !tokenTicker ||
        tokenTicker == "" ||
        !destinationTicker ||
        destinationTicker == ""
      ) {
        setSwapButtonState(SwapButtonState.needTokenSelection);
        return;
      }
      if (swappingAmount == "") {
        setSwapButtonState(SwapButtonState.needAmountInput);
        return;
      }
      if (!balances) {
        return;
      }
      if (!isBalancesMoreThanInput(balances, swappingAmount)) {
        setSwapButtonState(SwapButtonState.insufficientBalance);
        return;
      }
      const walletAddress = await wallet.getAddress();
      const tokenContract = new ethers.Contract(
        tokens[tokenTicker],
        erc20ABI,
        provider
      );
      const allowances: bigint = await tokenContract.allowance(
        walletAddress,
        address
      );
      const amount: bigint = ethers.utils.parseEther(swappingAmount).toBigInt();
      console.log("Allowances:", ethers.utils.formatUnits(allowances, "ether"));
      if (allowances >= amount) {
        setSwapButtonState(SwapButtonState.needSwap);
      } else {
        setSwapButtonState(SwapButtonState.needApprove);
      }
    };

    if (!tokenTicker) {
      return;
    }
    hasApproved(tokenTicker, swappingAmount);
  }, [...deps]);
};
