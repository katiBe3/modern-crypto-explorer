import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const MarketTeaser = ({ assets }) => {
  if (!assets) {
    return (
      <Box textAlign="center" my={4} mx={8}>
        Loading Bitcoin data...
      </Box>
    );
  }

  const calculateMarketData = (assets) => {
    let totalMarketCap = 0;
    let weightedPercentChange = 0;
    let totalWeight = 0;
  
    assets.forEach(asset => {
      const marketCap = parseFloat(asset.marketCapUsd);
      const percentChange = parseFloat(asset.changePercent24Hr);
      
      if (!isNaN(marketCap) && !isNaN(percentChange)) {
        totalMarketCap += marketCap;
        weightedPercentChange += marketCap * percentChange;
        totalWeight += marketCap;
      }
    });
  
    const overallPercentChange = totalWeight > 0 ? (weightedPercentChange / totalWeight) : 0;
    const marketCapInTrillions = (totalMarketCap / 1e12).toFixed(2);
    const changeSign = overallPercentChange > 0 ? "+" : "";
    const percentChangeFormatted = `${changeSign}${overallPercentChange.toFixed(2)}`;
  
    return {
      marketCap: marketCapInTrillions,
      percentChange: percentChangeFormatted,
    };
  };
  
  const { marketCap, percentChange } = calculateMarketData(assets);

  return (
    <Box textAlign="center" m={8}>
      <Heading mb={4}>The Latest Crypto Market News</Heading>
      <Text fontSize="xl" color="gray.600">
        The total market cap today is{" "}
        <Text as="span" fontWeight="bold">
          ${marketCap} Trillion
        </Text>
        , a{" "}
        <Text as="span" fontWeight="bold" color={percentChange.startsWith('+') ? "green.400" : "red.400"}>
          {percentChange}%
        </Text>{" "}
        change in the last 24 hours.🚀
      </Text>
    </Box>
  );
};

export default MarketTeaser;
