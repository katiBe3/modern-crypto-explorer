import React, { useState, useEffect } from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import NewsCard from "./NewsCard";

const CryptoNewsRow = ({ cryptoSymbol }) => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchCryptoNews = async () => {
      try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=${cryptoSymbol}`);
        const data = await response.json();
        setNewsData(data.Data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching crypto news data:", error);
      }
    };

    fetchCryptoNews();
  }, [cryptoSymbol]);

  return (
    <>
      {newsData.length > 0 && (
        <Box mt={8}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Latest News about {cryptoSymbol}
          </Text>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
            {newsData.map((newsItem, index) => (
              <NewsCard key={index} newsItem={newsItem} />
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default CryptoNewsRow;
