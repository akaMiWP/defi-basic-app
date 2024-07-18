import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Center,
  Box,
  Flex,
  Input,
  Spacer,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import iconSBR from "../../assets/SBR-icon.webp";
import iconGDR from "../../assets/GDR-icon.webp";
import iconSMY from "../../assets/SMY-icon.webp";
import iconBDC from "../../assets/BDC-icon.webp";
import CustomIcon from "./CustomIcon";

interface Props {
  inputTitle: string;
  marginTop: number;
  tokens: string[];
  selectedInput: string | null;
  setSelectedInput: (input: string) => void;
  setAmountInput: ((input: string) => void) | null;
  input: string;
  setInput: (input: string) => void;
  setLastUpdated: (input: string) => void;
  isSelling: boolean;
  balances: string | null;
}

const InputComponent = ({
  inputTitle,
  marginTop,
  tokens,
  selectedInput,
  setSelectedInput,
  setAmountInput,
  input,
  setInput,
  setLastUpdated,
  isSelling,
  balances,
}: Props) => {
  const handleChange = (event) => {
    setInput(event.target.value);
    setLastUpdated(isSelling ? "sell" : "buy");
    setAmountInput && setAmountInput(event.target.value);
  };

  const bg = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");

  const iconPath = useMemo(() => {
    if (selectedInput == "SBR") {
      return iconSBR;
    }
    if (selectedInput == "GDR") {
      return iconGDR;
    }
    if (selectedInput == "SMY") {
      return iconSMY;
    }
    if (selectedInput == "BDC") {
      return iconBDC;
    }
  }, [selectedInput]);

  return (
    <Center marginTop={marginTop}>
      <Box
        w="30%"
        justifyContent="center"
        height="125px"
        borderRadius={12}
        bg={bg}
        boxShadow="md"
      >
        <Text fontSize="sm" padding={4}>
          {inputTitle}
        </Text>
        <Flex paddingLeft={4} paddingRight={4}>
          <Input
            value={input}
            placeholder="0"
            variant="unstyled"
            fontSize="2xl"
            onChange={handleChange}
          />
          <Spacer />
          <Menu>
            <MenuButton
              as={Button}
              boxShadow="xl"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              paddingRight={selectedInput ? "30px" : "15px"}
            >
              <HStack spacing={1}>
                {iconPath && <CustomIcon path={iconPath} boxSize="30px" />}
                <Box flex="1" textAlign="left" ml={2}>
                  {selectedInput}
                </Box>
                <ChevronDownIcon />
              </HStack>
            </MenuButton>
            <MenuList>
              {tokens.map((token) => {
                return (
                  <MenuItem key={token} onClick={() => setSelectedInput(token)}>
                    {token}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </Flex>
        {balances && (
          <Text
            fontSize="xs"
            textColor={textColor}
            paddingLeft={4}
            paddingTop={1}
          >
            Balances: {balances}
          </Text>
        )}
      </Box>
    </Center>
  );
};

export default InputComponent;
