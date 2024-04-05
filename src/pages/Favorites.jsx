import React, { useState, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import CryptoTable from "../components/market/table/CryptoTable";
import NewsSection from "../components/news/NewsSection";
import useAssetStore from "../stores/useAssetStore";
import useNewsStore from "../stores/useNewsStore";

const Favorites = () => {
  const assets = useAssetStore((state) => state.assets);
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

  // Fetch multiCryptoNews when favorites change
  useEffect(() => {
    const favoriteCryptosSymbols = Object.keys(favorites);
    if (favoriteCryptosSymbols.length > 0) {
      // Access fetchMultiCryptoNews from useNewsStore
      useNewsStore.getState().fetchMultiCryptoNews(favoriteCryptosSymbols);
    }
  }, [favorites]);

  const favoriteCryptos = assets.filter((asset) => favorites[asset.symbol]);

  return (
    <Box m={8} maxWidth="1200px" mx="auto">
      <Heading as="h1" size="xl" mb={4} textAlign="center">
        Your Favorite Cryptocurrencies
      </Heading>
      <Text fontSize="xl" mb={8} textAlign="center">
        Keep your most loved cryptocurrencies close and never miss a beat in the market!
      </Text>
      {favoriteCryptos.length > 0 && <CryptoTable assets={favoriteCryptos} setFavorites={setFavorites} showFavoritesOnly={true} />}
      {favoriteCryptos.length > 0 && <NewsSection cryptos={favoriteCryptos.map((crypto) => crypto.symbol)} />}
    </Box>
  );
};

export default Favorites;
