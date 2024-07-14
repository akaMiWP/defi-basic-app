export const calculateBuyOutput = (sell: string, priceFeedInEther: string) => {
  if (!sell) {
    return null;
  }

  const priceFeed = Number(priceFeedInEther);
  const sellInput = Number(sell);
  const buyOutput = priceFeed * sellInput;
  return buyOutput;
};
