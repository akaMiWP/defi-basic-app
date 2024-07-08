import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import React from "react";

const Swap = () => {
  return (
    <Center marginTop={16}>
      <HStack width="400px" color="orange.50" marginBottom={4}>
        <Button>Swap</Button>
        <Spacer></Spacer>
      </HStack>
      <Container></Container>
    </Center>
  );
};

export default Swap;
