import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import priceFeed from "../../hooks/PriceFeed";
import { Pair } from "../../interfaces/Pair";
import InputComponent from "./InputComponent";

const Swap = () => {
  const [pair, setPair] = useState<Pair | null>(null);
  const [baseCurrency, setBaseCurrency] = useState<string | null>(null);
  const [destinationCurrency, setDestinatonCurrency] = useState<string | null>(
    null
  );

  useEffect(() => {
    priceFeed();
    if (baseCurrency && destinationCurrency) {
      console.log();
    }
  }, [baseCurrency, destinationCurrency]);

  return (
    <>
      <Center marginTop={16}>
        <Box w="30%" justifyContent="center">
          <Button>Swap</Button>
        </Box>
      </Center>
      <InputComponent inputTitle="Sell" marginTop={4}></InputComponent>
      <Center>
        <Box as="button" boxSize={12}>
          <ChevronDownIcon />
        </Box>
      </Center>
      <InputComponent inputTitle="Buy" marginTop={1}></InputComponent>
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
