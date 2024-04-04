import React, { useEffect } from "react";
import { Box, Grid } from "@chakra-ui/react";
import NewsCard from "./NewsCard";
import useNewsStore from "../../stores/useNewsStore"; // Adjust the import path as necessary

const NewsSection = ({ cryptos }) => {
  const { multiCryptoNewsData, fetchMultiCryptoNews } = useNewsStore((state) => ({
    multiCryptoNewsData: state.multiCryptoNewsData,
    fetchMultiCryptoNews: state.fetchMultiCryptoNews,
  }));

  useEffect(() => {
    fetchMultiCryptoNews(cryptos);
    const interval = setInterval(() => fetchMultiCryptoNews(cryptos), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [cryptos, fetchMultiCryptoNews]);

  return (
    <Box my={8}>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
        {multiCryptoNewsData.map((newsItem, index) => (
          <NewsCard key={index} newsItem={newsItem} />
        ))}
      </Grid>
    </Box>
  );
};

export default NewsSection;
