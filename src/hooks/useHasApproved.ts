import { ethers } from "ethers";
import tokens from "../data/tokens";
import { wallet, erc20ABI, provider, address } from "../domain/ContractSetup";
import { useEffect, useState } from "react";

export const useHasApproved = (
  tokenTicker: string | null,
  swappingAmount: string,
  deps: unknown[]
) => {
  const [hasApproved, setHasApproved] = useState<boolean>(false);

  useEffect(() => {
    const hasApproved = async (tokenTicker: string, swappingAmount: string) => {
      if (swappingAmount == "") {
        return false;
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
      setHasApproved(allowances >= amount);
    };

    if (!tokenTicker) {
      return;
    }
    console.log("useHasApproved");
    hasApproved(tokenTicker, swappingAmount);
  }, [...deps]);

  return hasApproved;
};
