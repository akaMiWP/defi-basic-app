import {
  Box,
  Button,
  Center,
  HStack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useMemo, useState } from "react";
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
import { useSwap } from "../../hooks/useSwap";
import { BlockConfirmLoadingDialog } from "./BlockConfirmLoadingDialog";
import { TransactionState } from "../../domain/TransactionState";

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
  const [didClickSwapButton, setDidClickSwapButton] = useState<boolean>(false);
  const [transactionState, setTransactonState] = useState<TransactionState>(
    TransactionState.idle
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    transactionState,
  ]);
  const getPriceFeed = useGetPriceFeed(baseCurrency, destinationCurrency, [
    baseCurrency,
    destinationCurrency,
  ]);
  useSubscribeToApprovalEvent(baseCurrency, setActionText, setTransactonState, [
    baseCurrency,
  ]);
  useApprove(
    sellTokenAddress,
    sellAmountInput,
    setDidClickApproveButton,
    didClickApproveButton,
    setTransactonState
  );
  useSwap(
    baseCurrency,
    destinationCurrency,
    sellAmountInput,
    setDidClickSwapButton,
    didClickSwapButton,
    setTransactonState
  );

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
      console.log("Swapping");
      setDidClickSwapButton(true);
    } else {
      console.log("Approving");
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
    if (transactionState == TransactionState.idle) {
      onClose();
      return;
    }
    if (transactionState == TransactionState.confirming) {
      onOpen();
      return;
    }
    if (transactionState == TransactionState.confirmed) {
      onOpen();
      return;
    }
  }, [transactionState]);

  // Color
  const buttonColor = useColorModeValue("orange.300", "teal.500");
  const hoverButtonColor = useColorModeValue("teal.500", "orange.300");

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
          bg={buttonColor}
          _hover={{
            bg: hoverButtonColor,
          }}
          justifyContent="center"
          height="50px"
          borderRadius={12}
          onClick={() => actionButtonClicked()}
        >
          <HStack justifyContent="center" paddingLeft={0}>
            <Text fontSize="sm" padding={4}>
              {actionText}
            </Text>
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
      <BlockConfirmLoadingDialog
        isOpen={isOpen}
        onClose={onClose}
        transactionState={transactionState}
      />
    </>
  );
};

export default Swap;
