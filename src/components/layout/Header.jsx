import React, { useState } from "react";
import { Flex, Text, Button, useColorMode, Icon, useMediaQuery, Box } from "@chakra-ui/react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import InfoBar from "../common/InfoBar";
import InfoTicker from "../common/InfoTicker";
import GasPriceInfo from "../common/GasPriceInfo";
import SearchInput from "./SearchInput";
import { Link as RouterLink } from 'react-router-dom';

const Header = ({ }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const menuItems = [
    { label: "📈 Market", to: "/" },
    { label: "❤️ Favorites", to: "/favorites" }, 
    { label: "📰 News", to: "/news" },
  ];

  const ctaButton = (
    <Button bg="brand.main" color="white" fontWeight="bold" textShadow="0 0 8px rgba(255, 255, 255, 0.4)" _hover={{ bg: "brand.darker" }} _active={{ bg: "brand.main" }} as={RouterLink} to="/about">
      About Us
    </Button>
  );

  const infoComponent = isMobile ? <InfoTicker /> : <InfoBar />;

  const desktopMenu = !isMobile && !isMenuOpen && (
    <Flex px={4} py={2} alignItems="center" justifyContent="space-between" borderBottom="2px" borderColor="gray.50">
      <Flex maxWidth="1200" fontWeight="bold" mr={8}>
        {menuItems.map((item, index) => (
          <Text as={RouterLink} to={item.to} mr={8} key={index}>
            {item.label}
          </Text>
        ))}
      </Flex>
      <Flex alignItems="center" gap={3} justifyContent="flex-end">
        <GasPriceInfo showTooltip={true} />
        <SearchInput />
        <Button onClick={toggleColorMode} variant="outline" borderColor="gray.200" ml="auto">
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {ctaButton}
      </Flex>
    </Flex>
  );

  const mobileMenu = isMobile && (
    <Flex px={4} py={2} alignItems="center" justifyContent="space-between" borderBottom="2px" borderColor="gray.50">
      <Flex alignItems="center">
        <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <Icon as={FaTimes} /> : <Icon as={FaBars} />}
        </Button>
      </Flex>
    </Flex>
  );

  const mobileMenuOpen = isMobile && isMenuOpen && (
    <Flex flexDirection="column" bg="gray.100" py={4} px={2} borderBottom="2px" borderColor="gray.50" fontWeight="bold" width="100%">
      {menuItems.map((item, index) => (
        <Text as={RouterLink} to={item.to} mb={2} key={index}>
          {item.label}
        </Text>
      ))}
      {ctaButton}
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
