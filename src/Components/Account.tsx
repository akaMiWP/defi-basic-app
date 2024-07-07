import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import truncateMiddle from "../Helpers/String+Ext";

const Account = () => {
  const [account, setAccount] = useState<string | null>("123");

  return (
    <>
      <Box>
        <HStack>
          {account && (
            <Text marginRight={4} color="cyan.100">
              {truncateMiddle(account, 12)}
            </Text>
          )}
          <Button color={account ? "orange.200" : "teal.50"}>
            {account ? "Connected" : "Connect"}
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default Account;
