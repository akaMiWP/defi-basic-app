import { useState } from "react";
import { ChakraProvider, Text } from "@chakra-ui/react";
import NavigationBar from "./Components/NavigationBar";
import Swap from "./Components/Swap";

function App() {
  return (
    <ChakraProvider>
      <NavigationBar />
      <Swap />
    </ChakraProvider>
  );
}

export default App;
