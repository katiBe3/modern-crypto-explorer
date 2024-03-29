import { useState, useMemo } from 'react';
import { Flex, Text, Button, useColorMode, Box, useBreakpointValue, Icon } from '@chakra-ui/react';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa'; // Import burger and close icons
import InfoBar from '../common/InfoBar'; // Import InfoBar component
import InfoTicker from '../common/InfoTicker'; // Import InfoTicker component

const Header = ({ marketData = {} }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility

  const isMobile = useBreakpointValue({ base: true, md: false });

  const formattedMarketData = useMemo(() => {
    const { btcDominance = 0, ethDominance = 0, totalVolume = 0, marketDirection = "neutral", totalMarketCap = 0 } = marketData;

    // Check if totalMarketCap is a valid number before formatting
    const formattedTotalMarketCap = typeof totalMarketCap === 'number' && !isNaN(totalMarketCap) ?
      `$${parseFloat(totalMarketCap).toFixed(2)} Trillion` : 'N/A';

    return {
      btcDominance: `${btcDominance}%`,
      ethDominance: `${ethDominance}%`,
      totalVolume: `$${totalVolume} Billion`,
      marketDirection,
      totalMarketCap: formattedTotalMarketCap,
    };
  }, [marketData]);

  const infoComponent = isMobile ? <InfoTicker formattedMarketData={formattedMarketData} /> : <InfoBar formattedMarketData={formattedMarketData} />;

  const desktopMenu = !isMobile && !isMenuOpen && (
    <Flex maxWidth="1200" fontWeight="bold" mr={8}>
      <Text as="a" href="/" mr={8}>Market</Text>
      <Text as="a" href="/blog" mr={8}>Whale Splash</Text>
      <Text as="a" href="/favorites" mr={8}>Favorites</Text>
      <Text as="a" href="/learn" mr={8}>Learn</Text>
    </Flex>
  );

  return (
    <Box>
      {/* Render InfoBar or InfoTicker */}
      {infoComponent}
      <Flex
        px={4}
        py={2}
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px"
        borderColor="gray.200"
        boxShadow="md"
      >
        <Flex alignItems="center">
          {isMobile && (
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu visibility
            >
              {isMenuOpen ? <Icon as={FaTimes} /> : <Icon as={FaBars} />} {/* Burger menu icon */}
            </Button>
          )}
          {desktopMenu}
          {/* Render menu items for mobile */}
          {isMenuOpen && isMobile && (
            <Flex
              flexDirection="column"
              bg="gray.100"
              py={4}
              px={2}
              borderBottom="1px"
              borderColor="gray.200"
            >
              <Text as="a" href="/" mb={2}>Market</Text>
              <Text as="a" href="/blog" mb={2}>Whale Splash</Text>
              <Text as="a" href="/favorites" mb={2}>Favorites</Text>
              <Text as="a" href="/learn" mb={2}>Learn</Text>
            </Flex>
          )}
        </Flex>
        <Flex alignItems="center" gap={4} justifyContent="flex-end">
          <Button onClick={toggleColorMode} variant="outline" borderColor="gray.200" ml="auto">
            {colorMode === 'light' ? <FaMoon /> : <FaSun />}
          </Button>
          <Button
            bg="#5A4FCF"
            color="white"
            fontWeight="bold"
            textShadow="0 0 8px rgba(255, 255, 255, 0.4)"
            _hover={{ bg: '#4A3FBF' }}
            _active={{ bg: '#3A2FAF' }}
            onClick={() => (window.location.href = '/about')}
          >
            Learn More
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
