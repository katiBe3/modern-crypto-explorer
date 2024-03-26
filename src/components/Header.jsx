import React from "react";
import { Flex, Text, InputGroup, InputLeftElement, Icon, Input, Button, useColorMode } from "@chakra-ui/react";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleChange = (event) => setSearchQuery(event.target.value);

  return (
    <Flex px={4} py={2} alignItems="center" justifyContent="space-between" borderBottom="1px" borderColor="gray.200" boxShadow="md">
      <Flex maxWidth="1200px" fontWeight="bold" mr={8}>
        {/* Navigation links can be further broken down into their own components if necessary */}
        <Text mr={8}>📈 Markets</Text>
        <Text mr={8}>📰 Blog</Text>
        <Text mr={8}>🧭 Explore</Text>
        <Text mr={8}>🎓 Learn</Text>
      </Flex>
      <Flex alignItems="center">
        <InputGroup mr={4} width="200px">
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Search..."
            bg="gray.100"
            size="sm"
            value={searchQuery}
            onChange={handleChange}
          />
        </InputGroup>
        <Button onClick={toggleColorMode} mr={4}>
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        <Button variant="outline" borderColor="gray.200" mr={4}>
          Login
        </Button>
        <Button bg="#5A4FCF" color="white">
          Sign up
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;