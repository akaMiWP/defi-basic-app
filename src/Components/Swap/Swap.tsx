import { Box, Button, Center, Text } from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useMemo, useState } from "react";
import {
  getPriceFeed,
  approve,
  hasApproved,
  subscribeToApprovalEvent,
  swapTokens,
} from "../../domain/interact-contracts";
import InputComponent from "./InputComponent";

import tokens from "../../data/tokens";
import { calculateBuyOutput } from "../../domain/calculate-price-inputs";

const tickers: string[] = Object.keys(tokens);

const Swap = () => {
  const [priceFeed, setPriceFeed] = useState<string | null>(null);
  const [baseCurrency, setBaseCurrency] = useState<string | null>(null);
  const [destinationCurrency, setDestinationCurrency] = useState<string | null>(
    null
  );
  const [sellAmountInput, setSellAmountInput] = useState<string | null>(null);
  const [buyAmountOutput, setBuyAmountOutput] = useState<string | null>(null);
  const [actionText, setActionText] = useState<string>("Approve");

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
    const isApproved: boolean = await hasApproved(baseCurrency);
    if (isApproved) {
      if (!destinationCurrency) {
        return;
      }
      swapTokens(baseCurrency, destinationCurrency, sellAmountInput);
    } else {
      approve(tokens[baseCurrency], sellAmountInput);
    }
  };

  useMemo(async () => {
    if (!baseCurrency) {
      return;
    }
    const isApproved: boolean = await hasApproved(baseCurrency);
    setActionText(isApproved ? "Swap" : "Approve");

    if (!sellAmountInput && !priceFeed) {
      return;
    }
    const buyOutput = calculateBuyOutput(
      sellAmountInput as string,
      priceFeed as string
    );
    console.log("Buy output:", buyOutput);
  }, [baseCurrency, sellAmountInput, priceFeed]);

  useEffect(() => {
    const fetchPriceFeed = async () => {
      if (baseCurrency && destinationCurrency && getPriceFeed) {
        try {
          const price = await getPriceFeed(baseCurrency, destinationCurrency);
          if (price != undefined) {
            setPriceFeed(price);
          }
        } catch (err) {
          console.log(err);
          setPriceFeed(null);
        }
      }
    };

    fetchPriceFeed();
  }, [baseCurrency, destinationCurrency]);

  useEffect(() => {
    if (!baseCurrency) {
      return;
    }
    return subscribeToApprovalEvent(baseCurrency, setActionText);
  }, [baseCurrency]);

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
          <Text fontSize="sm" padding={4}>
            {actionText}
          </Text>
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
