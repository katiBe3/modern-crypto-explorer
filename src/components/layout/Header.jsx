import React from "react";
import { Flex, Text, Icon, Button, useColorMode, useDisclosure } from "@chakra-ui/react";
import { FaGasPump, FaMoon, FaSun } from "react-icons/fa";

import SearchInput from "../common/SearchInput";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex px={4} py={2} alignItems="center" justifyContent="space-between" borderBottom="1px" borderColor="gray.200" boxShadow="md">
      <Flex maxWidth="1200" fontWeight="bold" mr={8}>
        <Text mr={8} onClick={() => (window.location.href = "/market")}>
          📈 Market
        </Text>
        <Text mr={8} onClick={() => (window.location.href = "/blog")}>
          📰 Blog
        </Text>
        <Text mr={8} onClick={() => (window.location.href = "/learn")}>
          🎓 Learn
        </Text>
      </Flex>
      <Flex alignItems="center">
        <SearchInput />
        <Button onClick={toggleColorMode} variant="outline" borderColor="gray.200" mr={4}>
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
