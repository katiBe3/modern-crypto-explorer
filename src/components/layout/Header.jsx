import React from "react";
import { Flex, Text, Button, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

import SearchInput from "../common/SearchInput";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex px={4} py={2} alignItems="center" justifyContent="space-between" borderBottom="1px" borderColor="gray.200" boxShadow="md">
      <Flex maxWidth="1200" fontWeight="bold" mr={8}>
        <Text as="a" href="/" mr={8}>
          📈 Market
        </Text>
        <Text as="a" href="/blog" mr={8}>
          🐳 Whale Watch
        </Text>
        <Text as="a" href="/learn" mr={8}>
          🎓 Learn
        </Text>
        <Text as="a" href="/favorites" mr={8}>
          ❤️ Favorites
        </Text>
      </Flex>
      <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
        <SearchInput />
        <Button onClick={toggleColorMode} variant="outline" borderColor="gray.200" mr={4}>
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
      </Flex>
      <Flex alignItems="center">
        <Button onClick={toggleColorMode} variant="outline" borderColor="gray.200">
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        <Button bg="#5A4FCF" color="white" _hover={{ bg: "#4A3FBF" }} _active={{ bg: "#3A2FAF" }} onClick={() => (window.location.href = "/about")}>
          Learn More
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
