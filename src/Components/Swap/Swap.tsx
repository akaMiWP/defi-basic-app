import { Box, Button, Center, Text } from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import getPriceFeed from "../../hooks/getPriceFeed";
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
  const [priceFeed, setPriceFeed] = useState<string | null>(null);
  const [baseCurrency, setBaseCurrency] = useState<string | null>(null);
  const [destinationCurrency, setDestinationCurrency] = useState<string | null>(
    null
  );

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
        tokens={baseCurrencyList}
        selectedInput={baseCurrency}
        setSelectedInput={setBaseCurrency}
      />
      <Center>
        <Box as="button" boxSize={12}>
          <ChevronDownIcon />
        </Box>
      </Center>
      <InputComponent
        inputTitle="Buy"
        marginTop={1}
        tokens={destinationCurrencyList}
        selectedInput={destinationCurrency}
        setSelectedInput={setDestinationCurrency}
      />
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
