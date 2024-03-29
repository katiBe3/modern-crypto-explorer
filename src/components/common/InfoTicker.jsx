import React, { useState, useEffect, memo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const InfoTicker = ({ formattedMarketData = {} }) => {
  const { btcDominance, ethDominance, totalVolume, marketDirection, totalMarketCap } = formattedMarketData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const tickerData = [`BTC: ${btcDominance}`, `ETH: ${ethDominance}`, `24h Vol: ${totalVolume}`, `Market Cap: ${totalMarketCap}`];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tickerData.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [tickerData]);

  if (!isVisible) {
    return null;
  }

  return (
    <Box bg="gray.800" py={2} px={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="white" fontWeight="bold">
          {tickerData[currentIndex]}
        </Text>
      </Flex>
    </Box>
  );
};

export default InfoTicker;
