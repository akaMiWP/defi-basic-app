import { ethers } from "ethers";
import { useEffect } from "react";
import { erc20ABI, wallet, address } from "../domain/ContractSetup";

export const useApprove = (
  tokenAddress: string | null,
  input: string | null,
  deps: unknown[]
) => {
  useEffect(() => {
    const approve = async (tokenAddress: string, input: string) => {
      console.log("Waiting for approve");
      const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, wallet);
      const amount = ethers.utils.parseEther(input);
      const txResponse = await tokenContract.approve(address, amount);
      console.log("Approve Trasanction Response:", txResponse);
    };

    if (tokenAddress && input) {
      approve(tokenAddress, input);
    }
  }, [...deps]);
};
