import React, { useContext } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FavoritesTable from "../components/market/FavoritesTable";
import { DataContext } from "../contexts/DataContext.jsx";

const Favorites = () => {
  const { favorites } = useContext(DataContext);
  const favoritesArray = Object.values(favorites);
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
        <FavoritesTable favorites={favoritesArray} />
      </Box>
      <Footer />
    </Box>
  );
};

export default Favorites;
