import appIcon from "../assets/app-icon.webp";
import { HStack, Image, Text, useColorModeValue } from "@chakra-ui/react";
import Account from "./Account";
import ColorModeToggler from "./ColorModeToggler";

const NavigationBar = () => {
  const color1 = useColorModeValue("orange.500", "teal.900");
  const color2 = useColorModeValue("orange.300", "teal.600");

  return (
    <>
      <HStack
        justifyContent={"space-between"}
        padding={4}
        bgGradient={`linear(to-r, ${color1}, ${color2})`}
      >
        <HStack>
          <Image src={appIcon} boxSize="40px" />
          <Text as="b" color="orange.100">
            Dogie Swap
          </Text>
        </HStack>
        <HStack>
          <ColorModeToggler />
          <Account />
        </HStack>
      </HStack>
    </>
  );
};

export default NavigationBar;
