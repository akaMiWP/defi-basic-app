import { Button, useColorMode } from "@chakra-ui/react";

const ColorModeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Button onClick={toggleColorMode} boxShadow="xl">
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </header>
  );
};

export default ColorModeToggler;
