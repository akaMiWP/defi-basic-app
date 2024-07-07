import { useState } from "react";
import { ChakraProvider, Text } from "@chakra-ui/react";
import NavigationBar from "./Components/NavigationBar";

function App() {
  return (
    <ChakraProvider>
      <NavigationBar />
      <Text>Hello World</Text>
    </ChakraProvider>
  );
}

export default App;
