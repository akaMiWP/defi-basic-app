import { ethers } from "ethers";
import { useEffect } from "react";
import tokens from "../data/tokens";
import { erc20ABI, provider } from "../domain/ContractSetup";
import { TransactionState } from "../domain/TransactionState";
import { SwapButtonState } from "../domain/SwapButtonState";

export const useSubscribeToApprovalEvent = (
  tokenTicker: string | null,
  setSwapButtonState: (state: SwapButtonState) => void,
  setTransactonState: (state: TransactionState) => void,
  deps: unknown[]
) => {
  useEffect(() => {
    const subscribeToApprovalEvent = (
      tokenTicker: string,
      setSwapButtonState: (state: SwapButtonState) => void
    ) => {
      const tokenContract = new ethers.Contract(
        tokens[tokenTicker],
        erc20ABI,
        provider
      );

      const handleApproval = (
        owner: string,
        spender: string,
        value: number
      ) => {
        console.log(
          `Approval event detected: Owner ${owner}, Spender ${spender}, Value ${value.toString()}`
        );
        setTransactonState(TransactionState.confirmed);
        setSwapButtonState(SwapButtonState.needSwap);
      };

      console.log("Start listening to Approval events on", tokenTicker);
      tokenContract.on("Approval", handleApproval);

      return () => {
        tokenContract.off("Approval", handleApproval);
        console.log("Stopped listening to Approval events on", tokenTicker);
      };
    };

    if (!tokenTicker) {
      return;
    }
    return subscribeToApprovalEvent(tokenTicker, setSwapButtonState);
  }, [...deps]);
};
