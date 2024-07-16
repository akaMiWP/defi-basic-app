import { Box, Button, Center, HStack, Spinner, Text } from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useMemo, useState } from "react";
import { swapTokens } from "../../domain/interact-contracts";
import InputComponent from "./InputComponent";

import tokens from "../../data/tokens";
import {
  calculateBuyOutput,
  calculateSellInput,
} from "../../domain/calculate-price-inputs";
import { useGetBalances } from "../../hooks/useGetBalances";
import { useHasApproved } from "../../hooks/useHasApproved";
import { useSubscribeToApprovalEvent } from "../../hooks/useSubscribeToApprovalEvent";
import { useGetPriceFeed } from "../../hooks/useGetPriceFeed";
import { useApprove } from "../../hooks/useApprove";

const tickers: string[] = Object.keys(tokens);

const Swap = () => {
  // State hooks
  const [priceFeed, setPriceFeed] = useState<string | null>(null);
  const [baseCurrency, setBaseCurrency] = useState<string | null>(null);
  const [destinationCurrency, setDestinationCurrency] = useState<string | null>(
    null
  );
  const [sellAmountInput, setSellAmountInput] = useState<string>("");
  const [buyAmountOutput, setBuyAmountOutput] = useState<string>("");
  const [actionText, setActionText] = useState<string>("Approve");
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [didClickApproveButton, setDidClickApproveButton] =
    useState<boolean>(false);

  const sellTokenAddress = baseCurrency ? tokens[baseCurrency] : null;
  const buyTokenAddress = destinationCurrency
    ? tokens[destinationCurrency]
    : null;

  // Custom Effect hooks
  const sellAmountBalances = useGetBalances(sellTokenAddress, [baseCurrency]);
  const buyAmountBalances = useGetBalances(buyTokenAddress, [
    destinationCurrency,
  ]);
  const hasApproved = useHasApproved(baseCurrency, sellAmountInput, [
    baseCurrency,
    sellAmountInput,
  ]);
  const getPriceFeed = useGetPriceFeed(baseCurrency, destinationCurrency, [
    baseCurrency,
    destinationCurrency,
  ]);
  useSubscribeToApprovalEvent(baseCurrency, setActionText, [baseCurrency]);
  useApprove(sellTokenAddress, sellAmountInput, [didClickApproveButton]);

  const buyTickers: string[] = useMemo(() => {
    return tickers.filter((key) => key != destinationCurrency);
  }, [destinationCurrency]);

  const sellTickers: string[] = useMemo(() => {
    return tickers.filter((key) => key != baseCurrency);
  }, [baseCurrency]);

  const actionButtonClicked = async () => {
    if (!baseCurrency) {
      return;
    }
    if (!sellAmountInput) {
      return;
    }
    if (hasApproved) {
      if (!destinationCurrency) {
        return;
      }
      swapTokens(baseCurrency, destinationCurrency, sellAmountInput);
    } else {
      setDidClickApproveButton(true);
    }
  };

  // Effect hooks
  useEffect(() => {
    setActionText(hasApproved ? "Swap" : "Approve");
  }, [hasApproved]);

  useEffect(() => {
    if (!priceFeed) {
      return;
    }
    if (lastUpdated === "sell") {
      const buyOutput = calculateBuyOutput(
        sellAmountInput as string,
        priceFeed as string
      );
      setBuyAmountOutput(buyOutput as string);
    } else if (lastUpdated === "buy") {
      if (buyAmountOutput == "0" || buyAmountOutput == "") {
        setSellAmountInput("");
        return;
      }
      const sellInput = calculateSellInput(
        buyAmountOutput as string,
        priceFeed as string
      );
      setSellAmountInput(sellInput as string);
    }
  }, [sellAmountInput, buyAmountOutput, priceFeed, lastUpdated]);

  useEffect(() => {
    if (getPriceFeed != undefined) {
      setPriceFeed(getPriceFeed);
    }
  }, [getPriceFeed]);

  useEffect(() => {
    setDidClickApproveButton(false);
  }, [baseCurrency, destinationCurrency]);

  return (
    <>
      <Center marginTop={16}>
        <Box w="30%" justifyContent="center">
          <Button>Swap</Button>
        </Box>
      </Center>
      <InputComponent
        inputTitle="Sell"
        marginTop={4}
        tokens={buyTickers}
        selectedInput={baseCurrency}
        setSelectedInput={setBaseCurrency}
        setAmountInput={setSellAmountInput}
        input={sellAmountInput}
        setInput={setSellAmountInput}
        setLastUpdated={setLastUpdated}
        isSelling={true}
        balances={sellAmountBalances}
      />
      <Center>
        <Box as="button" boxSize={12}>
          <ChevronDownIcon />
        </Box>
      </Center>
      <InputComponent
        inputTitle="Buy"
        marginTop={1}
        tokens={sellTickers}
        selectedInput={destinationCurrency}
        setSelectedInput={setDestinationCurrency}
        setAmountInput={null}
        input={buyAmountOutput}
        setInput={setBuyAmountOutput}
        setLastUpdated={setLastUpdated}
        isSelling={false}
        balances={buyAmountBalances}
      />
      <Center marginTop={6}>
        <Box
          as="button"
          w="30%"
          bg="teal.600"
          justifyContent="center"
          height="50px"
          borderRadius={12}
          onClick={() => actionButtonClicked()}
        >
          <HStack justifyContent="center" paddingLeft={0}>
            <Text fontSize="sm" padding={4}>
              {actionText}
            </Text>
            {/* <Spinner /> */}
          </HStack>
        </Box>
      </Center>
      {priceFeed && (
        <Center marginTop={6}>
          <Text fontSize="sm" padding={4}>
            {"1 " +
              baseCurrency +
              " = " +
              priceFeed +
              " " +
              destinationCurrency}
          </Text>
        </Center>
      )}
    </>
  );
};

export default Swap;
