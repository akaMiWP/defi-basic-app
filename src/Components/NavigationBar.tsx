import appIcon from "../assets/app-icon.webp";
import appIconDarkTheme from "../assets/app-icon-dark-theme.webp";
import { HStack, Image, Text, useColorModeValue } from "@chakra-ui/react";
import Account from "./Account";
import ColorModeToggler from "./ColorModeToggler";

const NavigationBar = () => {
  const color1 = useColorModeValue("orange.500", "teal.900");
  const color2 = useColorModeValue("orange.300", "teal.600");
  const icon = useColorModeValue(appIcon, appIconDarkTheme);
  const textColor = useColorModeValue("orange.100", "green.100");

  return (
    <>
      <HStack
        justifyContent={"space-between"}
        padding={4}
        bgGradient={`linear(to-r, ${color1}, ${color2})`}
      >
        <HStack>
          <Image src={icon} boxSize="40px" />
          <Text as="b" color={textColor}>
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
