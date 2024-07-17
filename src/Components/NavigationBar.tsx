import appIcon from "../assets/app-icon.webp";
import { HStack, Image, Text } from "@chakra-ui/react";
import Account from "./Account";
import ColorModeToggler from "./ColorModeToggler";

const NavigationBar = () => {
  return (
    <>
      <HStack
        justifyContent={"space-between"}
        padding={4}
        bgGradient="linear(to-r, teal.900, teal.600)"
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
