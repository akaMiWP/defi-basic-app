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
import { useEffect } from "react";
import priceFeed from "../hooks/PriceFeed";

const Swap = () => {
  useEffect(() => {
    priceFeed();
  }, []);

  return (
    <>
      <Center marginTop={16}>
        <Box w="30%" justifyContent="center">
          <Button>Swap</Button>
        </Box>
      </Center>
      <Center marginTop={4}>
        <Box
          w="30%"
          bg="teal.900"
          justifyContent="center"
          height="125px"
          borderRadius={12}
        >
          <Text fontSize="sm" padding={4}>
            Sell
          </Text>
          <Flex paddingLeft={4} paddingRight={4}>
            <Input placeholder="0" variant="unstyled" fontSize="2xl" />
            <Spacer />
            <Button borderRadius={18}>
              <Text>ETH</Text>
              <ChevronDownIcon marginLeft={2} />
            </Button>
          </Flex>
        </Box>
      </Center>
      <Center>
        <Box as="button" boxSize={12}>
          <ChevronDownIcon />
        </Box>
      </Center>
      <Center marginTop={1}>
        <Box
          w="30%"
          bg="teal.900"
          justifyContent="center"
          height="125px"
          borderRadius={12}
        >
          <Text fontSize="sm" padding={4}>
            Buy
          </Text>
          <Flex paddingLeft={4} paddingRight={4}>
            <Input placeholder="0" variant="unstyled" fontSize="2xl" />
            <Spacer />
            <Button borderRadius={18}>
              <Text>BTC</Text>
              <ChevronDownIcon marginLeft={2} />
            </Button>
          </Flex>
        </Box>
      </Center>
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
