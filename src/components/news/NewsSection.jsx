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

        const articlesBySource = data.Data.reduce((acc, article) => {
          if (!acc[article.source]) {
            acc[article.source] = [];
          }
          acc[article.source].push(article);
          return acc;
        }, {});

        const selectedArticles = [];
        const sources = Object.keys(articlesBySource);
        let sourceIndex = 0;

        while (selectedArticles.length < 3 && sourceIndex < sources.length) {
          const source = sources[sourceIndex];
          const articles = articlesBySource[source];

          if (articles.length > 0) {
            selectedArticles.push(articles.shift());
          }

          if (articles.length === 0) {
            sourceIndex++;
          }
        }

        sourceIndex = 0;
        while (selectedArticles.length < 3 && sourceIndex < sources.length) {
          const source = sources[sourceIndex];
          const articles = articlesBySource[source];

          if (articles.length > 0) {
            selectedArticles.push(articles.shift());
          }

          sourceIndex++;
        }

        setNewsData(selectedArticles);
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
