import React, { useState, useEffect } from "react";
import { Box, Grid, Flex, Show } from "@chakra-ui/react";
import NewsCard from "./NewsCard";
import CardSlider from "../layout/CardSlider";

const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN");
        const data = await response.json();
        setNewsData(data.Data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box my={8}>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
        {newsData.map((newsItem, index) => (
          <NewsCard key={index} newsItem={newsItem} />
        ))}
      </Grid>
      <Show below="md">
        <Flex justifyContent="center">
          <CardSlider
            cards={newsData.map((newsItem, index) => (
              <NewsCard key={index} newsItem={newsItem} />
            ))}
          />
        </Flex>
      </Show>
    </Box>
  );
};

export default NewsSection;
