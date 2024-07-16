import { useEffect, useState } from "react";

import { address, dexABI, wallet } from "../domain/ContractSetup";
import { ethers } from "ethers";
import tokens from "../data/tokens";

export const useGetPriceFeed = (
  sellTokenTicker: string | null,
  buyTokenTicker: string | null,
  deps: unknown[]
) => {
  const [priceFeed, setPriceFeed] = useState<string | null>(null);

  useEffect(() => {
    const getPriceFeed = async (
      sellTokenTicker: string,
      buyTokenTicker: string
    ) => {
      try {
        const dexContract = new ethers.Contract(address, dexABI, wallet);
        const priceFeedInBigInt: number =
          await dexContract.getPriceFeedFromPair(
            tokens[sellTokenTicker],
            tokens[buyTokenTicker]
          );

        const price = ethers.utils.formatEther(priceFeedInBigInt);
        console.log(
          sellTokenTicker,
          "/",
          buyTokenTicker,
          price,
          priceFeedInBigInt
        );
        setPriceFeed(price);
      } catch (error) {
        console.log(error);
      }
    };

    if (sellTokenTicker && buyTokenTicker) {
      getPriceFeed(sellTokenTicker, buyTokenTicker);
    }
  }, [...deps]);

  return priceFeed;
};
