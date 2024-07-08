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

const Swap = () => {
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
    </>
  );
};

export default Swap;
