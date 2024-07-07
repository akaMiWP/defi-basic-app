import React from "react";
import appIcon from "../assets/app-icon.webp";
import { Box, HStack, Image, Text } from "@chakra-ui/react";
import Account from "./Account";

const NavigationBar = () => {
  return (
    <>
      <HStack
        justifyContent={"space-between"}
        padding={4}
        background="cyan.900"
      >
        <HStack>
          <Image src={appIcon} boxSize="40px" />
          <Text as="b" color="orange.100">
            Dogie Swap
          </Text>
        </HStack>
        <Account />
      </HStack>
    </>
  );
};

export default NavigationBar;
