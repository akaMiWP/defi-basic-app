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
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  inputTitle: string;
  marginTop: number;
  tokens: string[];
}

const InputComponent = ({ inputTitle, marginTop, tokens }: Props) => {
  const [selectedInput, setSelectedInput] = useState<string | null>(null);

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
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {selectedInput}
            </MenuButton>
            <MenuList>
              {tokens.map((token) => {
                return (
                  <MenuItem onClick={() => setSelectedInput(token)}>
                    {token}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </Center>
  );
};

export default InputComponent;
