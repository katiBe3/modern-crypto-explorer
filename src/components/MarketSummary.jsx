import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const MarketSummary = ({ sortedCryptoData }) => {
  return (
    <Box textAlign="center" my={16} mx={8}>
      <Heading mb={4}>The Latest Crypto Market Data</Heading>
      <Text fontSize="xl" color="gray.600">
        The global cryptocurrency market cap today is{" "}
        <Text as="span" fontWeight="bold">
          $2.79 Trillion
        </Text>
        , a{" "}
        <Text as="span" fontWeight="bold" color="green.400">
          {sortedCryptoData.some((data) => data.percentChange24h > 0) ? "+" : ""}7.2%
        </Text>{" "}
        change in the last 24 hours.🚀
      </Text>
    </Box>
  );
};

export default MarketSummary;
