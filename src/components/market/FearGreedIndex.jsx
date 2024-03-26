import React, { useState, useEffect } from "react";
import { Box, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaBitcoin } from "react-icons/fa";
import { cryptoData } from "../../data/cryptoData";

const FearGreedIndex = () => {
  const [fearGreedIndex, setFearGreedIndex] = useState(0);
  const [indexSentiment, setIndexSentiment] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const indexColor = useColorModeValue("green.500", "green.300");

  const calculateFearGreedIndex = async () => {
    setLastUpdated(new Date());

    const response = await fetch("https://api.coincap.io/v2/assets?limit=100");
    const data = await response.json();
    const assets = data.data;

    const totalMarketCap = assets.reduce((sum, asset) => sum + parseFloat(asset.marketCapUsd), 0);

    const avgPercentChange24h = assets.reduce((sum, asset) => sum + parseFloat(asset.changePercent24Hr), 0) / assets.length;

    const percentIncreased = (assets.filter((asset) => parseFloat(asset.changePercent24Hr) > 0).length / assets.length) * 100;

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
    const updateIndex = async () => {
      const { index, sentiment } = await calculateFearGreedIndex();
      setFearGreedIndex(index);
      setIndexSentiment(sentiment);
    };

    updateIndex();
    const interval = setInterval(updateIndex, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

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
        Last updated: {lastUpdated ? "just now" : "N/A"}
      </Text>
    </Box>
  );
};

export default FearGreedIndex;
