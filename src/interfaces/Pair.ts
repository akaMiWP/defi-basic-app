export interface Pair {
  baseCurrency: string | null;
  destinationCurrency: string | null;
  price: bigint | null;
}

export const pairs: Pair[] = [
  { baseCurrency: "BTC", destinationCurrency: "ETH", price: null },
  { baseCurrency: "BTC", destinationCurrency: "USD", price: null },
  { baseCurrency: "LINK", destinationCurrency: "ETH", price: null },
  { baseCurrency: "LINK", destinationCurrency: "USD", price: null },
  { baseCurrency: "ETH", destinationCurrency: "USD", price: null },
  { baseCurrency: "DAI", destinationCurrency: "USD", price: null },
];
