import React, { useState, useEffect } from "react";
import { Flex, Text, Button, useColorMode, Icon } from "@chakra-ui/react";
import { FaMoon, FaSun, FaBitcoin } from "react-icons/fa";

const Header = () => {
  const [daysUntilHalving, setDaysUntilHalving] = useState(0);

  useEffect(() => {
    const calculateDaysUntilHalving = () => {
      const halvingInterval = 210000;
      const averageBlockTime = 10;

      const currentBlockHeight = 793968;
      const nextHalvingBlockHeight = Math.ceil(currentBlockHeight / halvingInterval) * halvingInterval;

      const blocksUntilHalving = nextHalvingBlockHeight - currentBlockHeight;
      const minutesUntilHalving = blocksUntilHalving * averageBlockTime;
      const days = Math.ceil(minutesUntilHalving / 1440);

      setDaysUntilHalving(days);
    };

    calculateDaysUntilHalving();
  }, []);
  const { colorMode, toggleColorMode } = useColorMode();

  const calculateDaysUntilHalving = () => {
    const halvingInterval = 210000;
    const averageBlockTime = 10;
    const currentBlockHeight = 793968;
    const nextHalvingBlockHeight = Math.ceil(currentBlockHeight / halvingInterval) * halvingInterval;
    const blocksUntilHalving = nextHalvingBlockHeight - currentBlockHeight;
    const minutesUntilHalving = blocksUntilHalving * averageBlockTime;
    return Math.ceil(minutesUntilHalving / 1440);
  };

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
      <Flex alignItems="center" gap={4} justifyContent="flex-end">
        <Text color="orange.400" fontSize="md" textAlign="right" mr={4}>
          <Icon as={FaBitcoin} mr={2} />
          Halving: {calculateDaysUntilHalving()} days
        </Text>
        <Button onClick={toggleColorMode} variant="outline" borderColor="gray.200" ml="auto">
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
