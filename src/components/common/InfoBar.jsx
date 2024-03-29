import React, { memo } from "react";
import { Box, Icon } from "@chakra-ui/react";

const InfoBar = ({ formattedMarketData = {} }) => {
  const { btcDominance, ethDominance, totalVolume, directionArrow, totalMarketCap } = formattedMarketData;
  return (
    <Box bg="gray.800" py={2} px={4} overflowX="auto" whiteSpace="nowrap">
      <Box color="white" textAlign="left" fontSize="sm" display="flex" alignItems="center">
        <Box mr={4}>
          <Box as="span" fontWeight="bold">
            BTC
          </Box>{" "}
          {btcDominance}%
        </Box>
        <Box mr={4}>
          <Box as="span" fontWeight="bold">
            ETH
          </Box>{" "}
          {ethDominance}%
        </Box>
        <Box mr={4}>
          24h Vol:{" "}
          <Box as="span" fontWeight="bold">
            {totalVolume}
          </Box>
        </Box>
        <Box mr={4}>
          Total Market Cap:{" "}
          <Box as="span" fontWeight="bold" textShadow="0 0 10px rgba(255, 255, 255, 0.75)">
            {totalMarketCap} {directionArrow}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(InfoBar);
