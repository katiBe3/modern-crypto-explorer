import React, { useState, useEffect } from "react";
import { Box, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaBitcoin } from "react-icons/fa";
import { cryptoData } from "../data/MockData";

const formatTimestamp = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} year${interval === 1 ? "" : "s"} ago`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${interval === 1 ? "" : "s"} ago`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} day${interval === 1 ? "" : "s"} ago`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hour${interval === 1 ? "" : "s"} ago`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minute${interval === 1 ? "" : "s"} ago`;
  }

  if (seconds === 0) {
    return "just now";
  }
  return `${Math.floor(seconds)} second${seconds === 1 ? "" : "s"} ago`;
};

const FearGreedIndex = () => {
  const [fearGreedIndex, setFearGreedIndex] = useState(0);
  const [indexSentiment, setIndexSentiment] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const indexColor = useColorModeValue("green.500", "green.300");

  const calculateFearGreedIndex = (data) => {
    setLastUpdated(new Date());
    const totalMarketCap = data.reduce((sum, crypto) => sum + crypto.marketCap, 0);

    const avgPercentChange24h = data.reduce((sum, crypto) => sum + crypto.percentChange24h, 0) / data.length;

    const percentIncreased = (data.filter((crypto) => crypto.percentChange24h > 0).length / data.length) * 100;

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

    return { index, sentiment };
  };

  useEffect(() => {
    const updateIndex = () => {
      const { index, sentiment } = calculateFearGreedIndex(cryptoData);
      const now = new Date();
      setFearGreedIndex(index);
      setIndexSentiment(sentiment);
      setLastUpdated(now);
    };

    updateIndex();
    const interval = setInterval(updateIndex, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box width="420px" mx="auto" mt={8} borderWidth={1} borderColor="gray.200" borderRadius="md" boxShadow="md" p={6} align="center" backgroundColor="gray.50">
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
      <Text fontSize="sm" fontWeight="normal" color="gray.500" textAlign="center">
        Last updated: {lastUpdated ? formatTimestamp(lastUpdated) : "N/A"}
      </Text>
    </Box>
  );
};

export default FearGreedIndex;
