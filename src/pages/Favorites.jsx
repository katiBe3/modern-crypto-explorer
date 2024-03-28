import React, { useContext } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CryptoTable from "../components/market/CryptoTable";
import { DataContext } from "../contexts/DataContext.jsx";

const Favorites = () => {
  const { favorites, assets } = useContext(DataContext);
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box flex="1" px={8} py={4} maxWidth="1200px" mx="auto" textAlign="center">
        <Heading as="h1" size="xl" mt={10} mb={4}>
          Your Favorite Cryptocurrencies
        </Heading>
        <Text fontSize="lg" mb={8}>
          Keep your most loved cryptocurrencies close and never miss a beat in the market!
        </Text>
        <CryptoTable assets={assets} favorites={favorites} showFavoritesOnly={true} />
      </Box>
      <Footer />
    </Box>
  );
};

export default Favorites;
