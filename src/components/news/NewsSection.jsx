import React, { useState, useEffect } from "react";
import { Grid } from "@chakra-ui/react";
import NewsCard from "./NewsCard";

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
    <Grid templateColumns="repeat(3, 1fr)" gap={8} my={8}>
      {newsData.map((newsItem, index) => (
        <NewsCard key={index} newsItem={newsItem} />
      ))}
    </Grid>
  );
};

export default NewsSection;
