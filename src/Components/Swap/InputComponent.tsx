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
} from "@chakra-ui/react";

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

  return (
    <Center marginTop={marginTop}>
      <Box
        w="30%"
        justifyContent="center"
        height="125px"
        borderRadius={12}
        bg={bg}
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
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {selectedInput}
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
            textColor="gray.400"
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
