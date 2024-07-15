import { ethers, BigNumberish } from "ethers";
import { erc20ABI, provider, wallet } from "../domain/ContractSetup";
import { useEffect, useState } from "react";

export const useGetBalances = (
  tokenAddress: string | null,
  deps: unknown[]
) => {
  const [balances, setBalances] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalances = async (tokenAddress: string) => {
      const tokenContract = new ethers.Contract(
        tokenAddress,
        erc20ABI,
        provider
      );
      const balance: BigNumberish = await tokenContract.balanceOf(
        await wallet.getAddress()
      );
      const balanceInEtherFormat = ethers.utils.formatUnits(balance, "ether");
      setBalances(balanceInEtherFormat);
      console.log("Token Address:", tokenAddress);
      console.log("Balances:", balances);
    };

    console.log("Fetching balances...");
    if (!tokenAddress) {
      return;
    }
    fetchBalances(tokenAddress);
  }, [...deps]);

  return balances;
};
