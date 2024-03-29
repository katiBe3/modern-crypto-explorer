import React, { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const InfoTicker = ({ formattedMarketData = {} }) => {
  const { btcDominance, ethDominance, totalVolume, totalMarketCap, marketDirection } = formattedMarketData;
  const [isVisible] = useState(true);
  const [tickerIndex, setTickerIndex] = useState(0);
// Convert marketDirection to a string if it's an object
  // Array of data options to cycle through
  const tickerData = [
    { label: "Dominance", value: `BTC: ${btcDominance} - ETH: ${ethDominance}` },
    { label: "Market Cap", value: `${totalMarketCap} - 24h Vol: ${totalVolume}` }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment tickerIndex and cycle back to 0 if it exceeds the array length
      setTickerIndex((prevIndex) => (prevIndex + 1) % tickerData.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [tickerData]); // Include tickerData in dependency array to ensure useEffect runs when data changes

  if (!isVisible) {
    return null;
  }

  return (
    <Box bg="gray.800" py={2} px={4}>
      <Flex alignItems="flex-start" justifyContent="flex-start">
        {/* Render current ticker data based on tickerIndex */}
        <Text color="white" fontSize="sm">
          <Text as="span" fontWeight="bold">{tickerData[tickerIndex].label}:</Text>{" "}
          <Text as="span" fontWeight="normal">{tickerData[tickerIndex].value}</Text>
        </Text>
      </Flex>
    </Box>
  );
};

export default InfoTicker;
