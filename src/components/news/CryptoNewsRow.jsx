import React, { useEffect } from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import NewsCard from "./NewsCard";
import useNewsStore from "../../stores/useNewsStore"; 

const CryptoNewsRow = ({ cryptoSymbol }) => {
  const { cryptoNewsData, fetchCryptoNews } = useNewsStore(state => ({
    cryptoNewsData: state.cryptoNewsData[cryptoSymbol],
    fetchCryptoNews: state.fetchCryptoNews,
  }));

  useEffect(() => {
    if (!cryptoNewsData) {
      fetchCryptoNews(cryptoSymbol);
    }
  }, [cryptoSymbol, cryptoNewsData, fetchCryptoNews]);

  return (
    <>
      {cryptoNewsData && cryptoNewsData.length > 0 && (
        <Box mt={8}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Latest News about {cryptoSymbol}
          </Text>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
            {cryptoNewsData.map((newsItem, index) => (
              <NewsCard key={index} newsItem={newsItem} />
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default CryptoNewsRow;