import React, { useState, useEffect } from "react";
import { Box, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaBitcoin } from "react-icons/fa";

const FearGreedIndex = ({ assets }) => {
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
    const calculateFearGreedIndex = async () => {
      if (!Array.isArray(assets)) return;

      setLastUpdated(Date.now());

      const avgPercentChange24h = assets.reduce((sum, data) => sum + parseFloat(data.changePercent24Hr), 0) / assets.length;
      const percentIncreased = (assets.filter((data) => parseFloat(data.changePercent24Hr) > 0).length / assets.length) * 100;

      let index = Math.floor(percentIncreased);
      if (avgPercentChange24h > 5) {
        index += 10;
      } else if (avgPercentChange24h < -5) {
        index -= 10;
      }

      index = Math.min(100, Math.max(0, index));

      let sentiment = "";
      if (index >= 75) {
        sentiment = "Extreme Greed 🤑";
      } else if (index >= 50) {
        sentiment = "Greed 😀";
      } else if (index >= 25) {
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
  }, [assets]); // Depend on assets to re-run the effect when it changes

  if (!assets) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box maxWidth="420px" mx="auto" mt={4} borderWidth={1} borderColor="gray.200" borderRadius="md" boxShadow="md" p={4} align="center" backgroundColor="gray.50">
      <Text fontSize="xl" fontWeight="bold" mb={1}>
        <Icon as={FaBitcoin} color="orange.400" mr={2} />
        Fear & Greed Index
      </Text>
      <Text fontSize="6xl" fontWeight="black" color={isNaN(fearGreedIndex) ? "gray.400" : indexColor} mb={1}>
        {isNaN(fearGreedIndex) ? "Loading..." : fearGreedIndex}
      </Text>
      <Text fontWeight="bold" color="gray.600" textAlign="center">
        {indexSentiment}
      </Text>
      <Text fontSize="sm" fontWeight="normal" color="gray.500" textAlign="center" mt={2}>
        Last updated: {lastUpdated ? formatDate(lastUpdated) : "N/A"}
      </Text>
    </Box>
  );
};

export default FearGreedIndex;
