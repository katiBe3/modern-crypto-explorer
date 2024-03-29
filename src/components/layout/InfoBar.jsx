import React, { memo } from "react";
import { Box, Icon } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const InfoBar = ({ marketData }) => {
  const { btcDominance, ethDominance, totalVolume, marketDirection, totalMarketCap } = marketData;
  return (
    <Box bg="#100D30" py={2} px={4} overflowX="auto" whiteSpace="nowrap">
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
            ${totalVolume} Billion
          </Box>
        </Box>
        <Box mr={4}>
          Total Market Cap:{" "}
          <Box as="span" fontWeight="bold" textShadow="0 0 10px rgba(255, 255, 255, 0.75)">
            ${totalMarketCap.toFixed(2)} Trillion
          </Box>
          {marketDirection === "up" ? <Icon as={FaArrowUp} color="green.500" ml={2} /> : <Icon as={FaArrowDown} color="red.500" ml={2} />}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(InfoBar);
