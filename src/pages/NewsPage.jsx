import React, { useEffect } from "react";
import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import NewsCard from "../components/news/NewsCard";
import useNewsStore from "../stores/useNewsStore"; 

const NewsPage = () => {
  const { newsData, fetchNews } = useNewsStore((state) => ({
    newsData: state.generalNewsData,
    fetchNews: state.fetchGeneralNews,
  }));

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <Box m={8} maxWidth="1200px" mx="auto">
      <Heading as="h1" size="xl" mb={4} textAlign="center">
        Latest Crypto News
      </Heading>
      <Text fontSize="xl" mb={8} textAlign="center">
        Stay up-to-date with the latest happenings in the world of cryptocurrencies.
      </Text>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8} mb={12}>
        {newsData.slice(0, 21).map((newsItem, index) => (
          <NewsCard key={index} newsItem={newsItem} />
        ))}
      </Grid>
    </Box>
  );
};

export default NewsPage;
