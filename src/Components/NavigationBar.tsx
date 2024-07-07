import React from "react";
import appIcon from "../assets/app-icon.webp";
import { Box, HStack, Image, Text } from "@chakra-ui/react";

const NavigationBar = () => {
  return (
    <>
      <HStack justifyContent={"space-between"} padding={4}>
        <HStack>
          <Image src={appIcon} boxSize="40px" />
          <Text as="b" color="orange.50">
            Dogie Swap
          </Text>
        </HStack>
      </HStack>
    </>
  );
};

export default NavigationBar;
