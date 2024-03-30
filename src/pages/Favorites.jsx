import React, { useState, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import CryptoTable from "../components/market/CryptoTable";

const Favorites = ({ assets, assetPriceData }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const localData = localStorage.getItem("favorites");
      return localData ? JSON.parse(localData) : {};
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);
  return (
    <Box flex="1" px={8} py={4} maxWidth="1200px" mx="auto" textAlign="center">
      <Heading as="h1" size="xl" mt={10} mb={4}>
        Your Favorite Cryptocurrencies
      </Heading>
      <Text fontSize="lg" mb={8}>
        Keep your most loved cryptocurrencies close and never miss a beat in the market!
      </Text>
      <CryptoTable assets={assets} assetPriceData={assetPriceData} setFavorites={setFavorites} showFavoritesOnly={true} />
    </Box>
  );
};

export default Favorites;
