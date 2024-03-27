import React, { useState, useEffect } from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

const FearGreedIndex = ({ bitcoinData }) => {
  const [fearGreedIndex, setFearGreedIndex] = useState(0);
  const [indexSentiment, setIndexSentiment] = useState("");

  const indexColor = useColorModeValue(indexSentiment.includes("Greed") ? "green.500" : "red.500", indexSentiment.includes("Greed") ? "green.200" : "red.200");

  useEffect(() => {
    const calculateFearGreedIndex = () => {
      if (!Array.isArray(bitcoinData) || bitcoinData.length < 2) return;

      let priceChanges = [];
      for (let i = 1; i < bitcoinData.length; i++) {
        const previousPrice = parseFloat(bitcoinData[i - 1].priceUsd);
        const currentPrice = parseFloat(bitcoinData[i].priceUsd);
        const priceChangePercent = ((currentPrice - previousPrice) / previousPrice) * 100;
        priceChanges.push(priceChangePercent);
      }

      const avgPriceChange = priceChanges.reduce((sum, change) => sum + change, 0) / priceChanges.length;
      // Adjust these values to get a more balanced index
      const scaledIndex = (avgPriceChange + 5.5) * 13; // Fine-tuning the scale and baseline
      const index = Math.round(Math.min(100, Math.max(0, scaledIndex))); // Ensure index is between 0 and 100

      let sentiment = "";
      if (index >= 80) {
        sentiment = "Extreme Greed 🤑";
      } else if (index >= 60) {
        sentiment = "Greed 😀";
      } else if (index >= 40) {
        sentiment = "Neutral 😐";
      } else if (index >= 20) {
        sentiment = "Fear 😰";
      } else {
        sentiment = "Extreme Fear 😱";
      }

      setFearGreedIndex(index);
      setIndexSentiment(sentiment);
    };

    calculateFearGreedIndex();

    const interval = setInterval(calculateFearGreedIndex, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [bitcoinData]);

  if (!bitcoinData) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box maxWidth="420px" mx="auto" mt={4} borderWidth={1} borderColor="gray.200" borderRadius="md" boxShadow="md" p={4} align="center" backgroundColor="gray.50">
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Fear & Greed Index
      </Text>
      <Text fontSize="6xl" fontWeight="black" color={isNaN(fearGreedIndex) ? "gray.400" : indexColor} mb={1}>
        {isNaN(fearGreedIndex) ? "Loading..." : fearGreedIndex}
      </Text>
      <Text fontWeight="semibold" color="gray.600" textAlign="center">
        {indexSentiment}
      </Text>
    </Box>
  );
};

export default FearGreedIndex;
