import { useState } from "react";
import { ChakraProvider, Text } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Text>Hello World</Text>
    </ChakraProvider>
  );
}

export default App;
