import { Box, Button, Center, Text } from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import priceFeed from "../../hooks/PriceFeed";
import InputComponent from "./InputComponent";

import { pairs } from "../../interfaces/Pair";

const baseCurrencySet: Set<string> = new Set(
  pairs.map((pair) => pair.baseCurrency)
);
const destinationCurrencySet: Set<string> = new Set(
  pairs.map((pair) => pair.destinationCurrency)
);
const baseCurrencyList: string[] = Array.from(baseCurrencySet);
const destinationCurrencyList: string[] = Array.from(destinationCurrencySet);

const Swap = () => {
  const [baseCurrency, setBaseCurrency] = useState<string | null>(null);
  const [destinationCurrency, setDestinationCurrency] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (baseCurrency && destinationCurrency) {
      console.log("Got base currency and destination currency");
      priceFeed(baseCurrency, destinationCurrency);
    }
  }, [baseCurrency, destinationCurrency]);

  return (
    <>
      <Center marginTop={16}>
        <Box w="30%" justifyContent="center">
          <Button>Swap</Button>
        </Box>
      </Center>
      <InputComponent
        key={`sell-${baseCurrency}`}
        inputTitle="Sell"
        marginTop={4}
        tokens={baseCurrencyList}
        selectedInput={baseCurrency}
        setSelectedInput={setBaseCurrency}
      ></InputComponent>
      <Center>
        <Box as="button" boxSize={12}>
          <ChevronDownIcon />
        </Box>
      </Center>
      <InputComponent
        key={`buy-${destinationCurrency}`}
        inputTitle="Buy"
        marginTop={1}
        tokens={destinationCurrencyList}
        selectedInput={destinationCurrency}
        setSelectedInput={setDestinationCurrency}
      ></InputComponent>
      <Center marginTop={6}>
        <Box
          as="button"
          w="30%"
          bg="teal.600"
          justifyContent="center"
          height="50px"
          borderRadius={12}
        >
          <Text fontSize="sm" padding={4}>
            Approve
          </Text>
        </Box>
      </Center>
    </>
  );
};

export default Swap;
