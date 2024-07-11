import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Center,
  Box,
  Flex,
  Input,
  Spacer,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  inputTitle: string;
  marginTop: number;
}

const InputComponent = ({ inputTitle, marginTop }: Props) => {
  useState("");

  return (
    <Center marginTop={marginTop}>
      <Box
        w="30%"
        bg="teal.900"
        justifyContent="center"
        height="125px"
        borderRadius={12}
      >
        <Text fontSize="sm" padding={4}>
          {inputTitle}
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
  );
};

export default InputComponent;
