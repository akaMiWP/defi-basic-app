export const calculateBuyOutput = (sell: string, priceFeedInEther: string) => {
  const priceFeed = Number(priceFeedInEther);
  const sellInput = Number(sell);
  const buyOutput = priceFeed * sellInput;
  return buyOutput.toString();
};

export const calculateSellInput = (buy: string, priceFeedInEther: string) => {
  const priceFeed = Number(priceFeedInEther);
  const buyOutput = Number(buy);
  const sellInput = priceFeed * (1 / buyOutput);
  return sellInput.toString();
};
