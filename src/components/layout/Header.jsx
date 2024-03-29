import React, { useState, useMemo } from "react";
import { Flex, Text, Button, useColorMode, Icon, useMediaQuery, Box } from "@chakra-ui/react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import InfoBar from "../common/InfoBar";
import InfoTicker from "../common/InfoTicker";

const Header = ({ marketData = {} }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const formattedMarketData = useMemo(() => {
    const { btcDominance = 0, ethDominance = 0, totalVolume = 0, marketDirection = "neutral", totalMarketCap = 0 } = marketData;
    const formattedTotalMarketCap = typeof totalMarketCap === "number" && !isNaN(totalMarketCap) ? `$${parseFloat(totalMarketCap).toFixed(2)} Trillion` : "N/A";

    return {
      btcDominance: `${btcDominance}%`,
      ethDominance: `${ethDominance}%`,
      totalVolume: `$${totalVolume} Billion`,
      marketDirection,
      totalMarketCap: formattedTotalMarketCap,
    };
  }, [marketData]);

  const menuItems = [
    { label: "📈 Market", href: "/" },
    { label: "🐋 Whale Splash", href: "/blog" },
    { label: "❤️ Favorites", href: "/favorites" },
    { label: "🎓 Learn", href: "/learn" },
  ];

  const learnMoreButton = (
    <Button bg="#5A4FCF" color="white" fontWeight="bold" textShadow="0 0 8px rgba(255, 255, 255, 0.4)" _hover={{ bg: "#4A3FBF" }} _active={{ bg: "#3A2FAF" }} onClick={() => (window.location.href = "/about")}>
      Learn More
    </Button>
  );

  const infoComponent = isMobile ? <InfoTicker formattedMarketData={formattedMarketData} /> : <InfoBar formattedMarketData={formattedMarketData} />;

  const desktopMenu = !isMobile && !isMenuOpen && (
    <Flex px={4} py={2} alignItems="center" justifyContent="space-between" borderBottom="1px" borderColor="gray.200" boxShadow="md">
      <Flex maxWidth="1200" fontWeight="bold" mr={8}>
        {menuItems.map((item, index) => (
          <Text key={index} as="a" href={item.href} mr={8}>
            {item.label}
          </Text>
        ))}
      </Flex>
      <Flex alignItems="center" gap={4} justifyContent="flex-end">
        <Button onClick={toggleColorMode} variant="outline" borderColor="gray.200" ml="auto">
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {learnMoreButton}
      </Flex>
    </Flex>
  );

  const mobileMenu = isMobile && (
    <Flex px={4} py={2} alignItems="center" justifyContent="space-between" borderBottom="1px" borderColor="gray.200" boxShadow="md">
      <Flex alignItems="center">
        <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <Icon as={FaTimes} /> : <Icon as={FaBars} />}
        </Button>
      </Flex>
    </Flex>
  );

  const mobileMenuOpen = isMobile && isMenuOpen && (
    <Flex flexDirection="column" bg="gray.100" py={4} px={2} borderBottom="1px" borderColor="gray.200" fontWeight="bold" width="100%">
      {menuItems.map((item, index) => (
        <Text key={index} as="a" href={item.href} mb={2}>
          {item.label}
        </Text>
      ))}
      {learnMoreButton}
    </Flex>
  );

  return (
    <Box>
      {infoComponent}
      {desktopMenu}
      {mobileMenu}
      {mobileMenuOpen}
    </Box>
  );
};

export default Header;
