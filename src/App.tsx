import { ChakraProvider } from "@chakra-ui/react";
import NavigationBar from "./Components/NavigationBar";
import Swap from "./Components/Swap/Swap";

function App() {
  return (
    <ChakraProvider>
      <NavigationBar />
      <Swap />
    </ChakraProvider>
  );
}

export default App;
