import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import truncateMiddle from "../Helpers/String+Ext";

const Account = () => {
  const [account, setAccount] = useState<string | null>(null);

  return (
    <>
      <Box>
        <HStack>
          {account && <Text>{truncateMiddle(account, 12)}</Text>}
          <Button color={account ? "yellow.200" : "yellow.50"}>
            {account ? "Connected" : "Connect"}
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default Account;
