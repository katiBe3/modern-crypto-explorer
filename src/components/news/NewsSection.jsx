import React, { useState, useEffect } from "react";
import { Box, Grid, Flex, Show } from "@chakra-ui/react";
import NewsCard from "./NewsCard";
import CardSlider from "../layout/CardSlider";

const NewsSection = ({ cryptos }) => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";
        if (cryptos) {
          const cryptoSymbols = Array.isArray(cryptos) ? cryptos.join(",") : cryptos;
          url += `&categories=${cryptoSymbols}`;
        }
        const response = await fetch(url);
        const data = await response.json();

        const selectedArticles = data.Data.reduce((acc, article) => {
          const sourceExists = acc.find((item) => item.source === article.source);
          if (!sourceExists && acc.length < 3) {
            acc.push(article);
          }
          return acc;
        }, []);

        setNewsData(selectedArticles);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [cryptos]);

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
