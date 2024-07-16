import { ethers } from "ethers";
import { useEffect } from "react";
import { erc20ABI, wallet, address } from "../domain/ContractSetup";
import { TransactionState } from "../domain/TransactionState";

export const useApprove = (
  tokenAddress: string | null,
  input: string | null,
  closure: (state: boolean) => void,
  showAllowApprove: boolean,
  setTransactonState: (state: TransactionState) => void
) => {
  useEffect(() => {
    const approve = async (tokenAddress: string, input: string) => {
      console.log("Waiting for approve");
      const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, wallet);
      const amount = ethers.utils.parseEther(input);
      const txResponse = await tokenContract.approve(address, amount);
      console.log("Approve Trasanction Response:", txResponse);
      setTransactonState(TransactionState.confirming);
    };

    if (tokenAddress && input && showAllowApprove) {
      approve(tokenAddress, input);
      closure(false);
    }
  }, [showAllowApprove]);
};
