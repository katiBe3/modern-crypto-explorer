import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const MarketTeaser = ({ bitcoinData }) => {
  // Add a check to ensure bitcoinData is defined
  if (!bitcoinData) {
    return (
      <Box textAlign="center" my={4} mx={8}>
        Loading Bitcoin data...
      </Box>
    );
  }

  const { marketCapUsd, changePercent24Hr } = bitcoinData;
  const marketCap = (parseFloat(marketCapUsd) / 1e12).toFixed(2);
  const percentChange = parseFloat(changePercent24Hr).toFixed(2);
  const changeSign = percentChange > 0 ? "+" : "";

  return (
    <Box textAlign="center" m={8}>
      <Heading mb={4}>The Latest Crypto Market News</Heading>
      <Text fontSize="xl" color="gray.600">
        The BTC market cap today is{" "}
        <Text as="span" fontWeight="bold">
          ${marketCap} Trillion
        </Text>
        , a{" "}
        <Text as="span" fontWeight="bold" color={percentChange > 0 ? "green.400" : "red.400"}>
          {changeSign}
          {percentChange}%
        </Text>{" "}
        change in the last 24 hours.🚀
      </Text>
    </Box>
  );
};

export default MarketTeaser;
