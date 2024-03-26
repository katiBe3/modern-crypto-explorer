import React from "react";
import { Flex, Text, Icon, Button, useColorMode, useDisclosure } from "@chakra-ui/react";
import { FaGasPump, FaMoon, FaSun } from "react-icons/fa";
import SearchInput from "./SearchInput";
import AuthModal from "./AuthModal";

const NavBar = () => {
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
        <Flex alignItems="center" mr={4}>
          <Icon as={FaGasPump} mr={2} />
          <Text>
            ETH Gas{" "}
            <Text as="span" fontWeight="bold" color="#5A4FCF">
              50 Gwei
            </Text>
          </Text>
        </Flex>
        <Button onClick={toggleColorMode} mr={4}>
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        <Button variant="outline" borderColor="gray.200" mr={4} onClick={onOpen}>
          Login
        </Button>
        <Button bg="#5A4FCF" color="white" onClick={onOpen}>
          Sign up
        </Button>
        <AuthModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Flex>
  );
};

export default NavBar;
