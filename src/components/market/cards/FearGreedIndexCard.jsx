import React, { useState, useEffect } from "react";
import { Box, Text, Icon, useColorModeValue, Skeleton, Flex } from "@chakra-ui/react";
import { FaBitcoin } from "react-icons/fa";
import Card from "../../layout/Card";

const FearGreedIndex = ({ bitcoinData }) => {
  const [fearGreedIndex, setFearGreedIndex] = useState(0);
  const [indexSentiment, setIndexSentiment] = useState("");
  const [lastUpdated, setLastUpdated] = useState(0);

  const formatDate = (timestamp) => {
    const options = { month: "long", day: "numeric" };
    const formattedDate = new Date(timestamp).toLocaleDateString("en-US", options);
    const day = formattedDate.split(" ")[1];
    const daySuffix = getDaySuffix(day);
    return formattedDate.replace(day, day + daySuffix);
  };

  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const indexColor = useColorModeValue(indexSentiment.includes("Greed") ? "green.500" : "red.500", indexSentiment.includes("Greed") ? "green.200" : "red.200");

  useEffect(() => {
    const calculateFearGreedIndex = () => {
      if (!Array.isArray(bitcoinData) || bitcoinData.length < 2) return;

      setLastUpdated(Date.now());

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

  return (
    <Card title="Fear & Greed Index">
      <Skeleton isLoaded={fearGreedIndex !== 0} height="60px">
        <Text fontSize="6xl" lineHeight="100%" fontWeight="black" color={indexColor} >
          {fearGreedIndex}
        </Text>
      </Skeleton>
      <Skeleton isLoaded={indexSentiment !== 0} height="24px">
        <Text fontWeight="bold" textAlign="center">
          {indexSentiment}
        </Text>
      </Skeleton>
      <Skeleton isLoaded={lastUpdated !== 0} height="20px" mt={2}>
        <Text fontSize="sm" fontWeight="normal" textAlign="center" color="gray.500">
          Last updated: {formatDate(lastUpdated)}
        </Text>
      </Skeleton>
    </Card>
  );
};

export default FearGreedIndex;
