import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const MarketTeaser = ({ marketCap, percentageChange }) => {
  const changeSign = percentageChange > 0 ? "+" : "";

  return (
    <Box textAlign="center" my={4} mx={8}>
      <Heading mb={4}>The Latest Crypto Market Data</Heading>
      <Text fontSize="xl" color="gray.600">
        The global cryptocurrency market cap today is{" "}
        <Text as="span" fontWeight="bold">
          ${marketCap} Trillion
        </Text>
        , a{" "}
        <Text as="span" fontWeight="bold" color={percentageChange > 0 ? "green.400" : "red.400"}>
          {changeSign}{percentageChange}%
        </Text>{" "}
        change in the last 24 hours.🚀
      </Text>
    </Box>
  );
};

export default MarketTeaser;
