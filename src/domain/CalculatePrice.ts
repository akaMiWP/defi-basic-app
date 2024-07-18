export const calculateBuyOutput = (sell: string, priceFeedInEther: string) => {
  const priceFeed = Number(priceFeedInEther);
  const sellInput = Number(sell);
  const buyOutput = priceFeed * sellInput;
  return buyOutput.toString();
};

export const calculateSellInput = (buy: string, priceFeedInEther: string) => {
  const priceFeed = Number(priceFeedInEther);
  const buyOutput = Number(buy);
  const sellInput = buyOutput * (1 / priceFeed);
  return sellInput.toString();
};

export const isBalancesMoreThanInput = (balances: string, input: string) => {
  const amountBalances = Number(balances);
  const amountInput = Number(input);
  return amountBalances >= amountInput;
};
