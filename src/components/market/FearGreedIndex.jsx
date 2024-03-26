import React, { useState, useEffect } from "react";
import { Box, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaBitcoin } from "react-icons/fa";

const FearGreedIndex = ({ assets }) => {
  const [fearGreedIndex, setFearGreedIndex] = useState(0);
  const [indexSentiment, setIndexSentiment] = useState("");
  const [lastUpdated, setLastUpdated] = useState(0);

  const formatTimeDifference = (timestamp) => {
    const currentTime = Date.now();
    const difference = currentTime - timestamp;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (difference < minute) {
      return "Just now";
    } else if (difference < hour) {
      const minutes = Math.floor(difference / minute);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (difference < day) {
      const hours = Math.floor(difference / hour);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(difference / day);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };
  const indexColor = indexSentiment.includes("Greed") ? "green.500" : indexSentiment.includes("Fear") ? "red.500" : useColorModeValue("green.500", "red.500");

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
    <Box maxWidth="420px" mx="auto" mt={8} borderWidth={1} borderColor="gray.200" borderRadius="md" boxShadow="md" p={6} align="center" backgroundColor="gray.50">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        <Icon as={FaBitcoin} color="orange.400" mr={2} />
        Fear & Greed Index
      </Text>
      <Box width="200px" height="100px" borderTopLeftRadius="100px" borderTopRightRadius="100px" borderWidth="10px" borderColor="gray.200" borderBottom="0" position="relative" boxSizing="border-box">
        <Text fontSize="6xl" fontWeight="black" color={indexColor} position="absolute" top="60%" left="50%" transform="translate(-50%, -50%)">
          {fearGreedIndex}
        </Text>
      </Box>
      <Text mt={4} fontWeight="bold" color="gray.600" textAlign="center">
        {indexSentiment}
      </Text>
      <Text fontSize="sm" fontWeight="normal" color="gray.500" textAlign="center" mt={2}>
        Last updated: {lastUpdated ? formatTimeDifference(lastUpdated) : "N/A"}
      </Text>
    </Box>
  );
};

export default FearGreedIndex;
