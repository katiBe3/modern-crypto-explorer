import { Flex, Text, Button, useColorMode, Box, useBreakpointValue } from "@chakra-ui/react";
import { useMemo } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import InfoBar from "../common/InfoBar";
import InfoTicker from "../common/InfoTicker.jsx";

const Header = ({ marketData = {} }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const formattedMarketData = useMemo(() => {
    const { btcDominance = 0, ethDominance = 0, totalVolume = 0, marketDirection = "neutral", totalMarketCap = 0 } = marketData;
    return {
      btcDominance: `${btcDominance}%`,
      ethDominance: `${ethDominance}%`,
      totalVolume: `$${totalVolume} Billion`,
      marketDirection,
      totalMarketCap: `$${totalMarketCap} Trillion`,
    };
  }, [marketData]);

  const infoComponent = isMobile ? <InfoTicker formattedMarketData={formattedMarketData} /> : <InfoBar formattedMarketData={formattedMarketData} />;

  return (
    <Box>
      {infoComponent}
      <Flex px={4} py={2} alignItems="center" justifyContent="space-between" borderBottom="1px" borderColor="gray.200" boxShadow="md">
        <Flex maxWidth="1200" fontWeight="bold" mr={8}>
          <Text as="a" href="/" mr={8}>
            📈 Market
          </Text>
          <Text as="a" href="/blog" mr={8}>
            🐳 Whale Splash
          </Text>
          <Text as="a" href="/favorites" mr={8}>
            ❤️ Favorites
          </Text>
          <Text as="a" href="/learn" mr={8}>
            🎓 Learn
          </Text>
        </Flex>
        <Flex alignItems="center" gap={4} justifyContent="flex-end">
          <Button onClick={toggleColorMode} variant="outline" borderColor="gray.200" ml="auto">
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </Button>
          <Button bg="#5A4FCF" color="white" fontWeight="bold" textShadow="0 0 8px rgba(255, 255, 255, 0.4)" _hover={{ bg: "#4A3FBF" }} _active={{ bg: "#3A2FAF" }} onClick={() => (window.location.href = "/about")}>
            Learn More
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
