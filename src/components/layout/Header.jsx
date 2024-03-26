import React from "react";
import { Flex, Text, Icon, Button, useColorMode, useDisclosure } from "@chakra-ui/react";
import { FaGasPump, FaMoon, FaSun } from "react-icons/fa";
import AuthModal from "../common/AuthModal";
import SearchInput from "../common/SearchInput";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex px={4} py={2} alignItems="center" justifyContent="space-between" borderBottom="1px" borderColor="gray.200" boxShadow="md">
      <Flex maxWidth="1200" fontWeight="bold" mr={8}>
        <Text mr={8}>📈 Markets</Text>
        <Text mr={8}>📰 Blog</Text>
        <Text mr={8}>🧭 Explore</Text>
        <Text mr={8}>🎓 Learn</Text>
      </Flex>
      <Flex alignItems="center">
        <SearchInput />
        <Button onClick={toggleColorMode} mr={4}>
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        <Button variant="outline" borderColor="gray.200" mr={4} onClick={() => onOpen("login")}>
          Login
        </Button>
        <Button bg="#5A4FCF" color="white" onClick={() => onOpen("signup")}>
          Sign up
        </Button>
        <AuthModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Flex>
  );
};

export default Header;
