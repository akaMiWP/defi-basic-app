import { ethers } from "ethers";
import tokens from "../data/tokens";
import { wallet, erc20ABI, provider, address } from "../domain/ContractSetup";
import { useEffect } from "react";
import { SwapButtonState } from "../domain/SwapButtonState";

export const useHasApproved = (
  tokenTicker: string | null,
  swappingAmount: string,
  setSwapButtonState: (state: SwapButtonState) => void,
  deps: unknown[]
) => {
  useEffect(() => {
    const hasApproved = async (tokenTicker: string, swappingAmount: string) => {
      if (tokenTicker == "") {
        setSwapButtonState(SwapButtonState.needTokenSelection);
      }
      if (swappingAmount == "") {
        setSwapButtonState(SwapButtonState.needAmountInput);
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
    console.log("useHasApproved");
    hasApproved(tokenTicker, swappingAmount);
  }, [...deps]);
};
