import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import truncateMiddle from "../Helpers/String+Ext";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const Account = () => {
  const [account, setAccount] = useState<string | null>(null);

  async function requestWeb3Account() {
    const accounts: string[] = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  }

  useEffect(() => {
    requestWeb3Account();
  }, []);

  return (
    <>
      <Box>
        <HStack>
          {account && (
            <Text marginRight={4} color="cyan.100">
              {truncateMiddle(account, 12)}
            </Text>
          )}
          <Button
            color={account ? "orange.200" : "teal.400"}
            onClick={requestWeb3Account}
          >
            {account ? "Connected" : "Connect"}
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default Account;
