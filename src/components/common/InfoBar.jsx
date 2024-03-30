import React, { memo } from "react";
import { Box } from "@chakra-ui/react";
import Bar from "../layout/Bar";
import MarketArrow from "./MarketArrow";

const InfoBar = ({ formattedMarketData = {} }) => {
  const { btcDominance, ethDominance, totalVolume, marketDirection, totalMarketCap } = formattedMarketData;
  return (
    <Bar>
      <Box mr={4}>
        <Box as="span" fontWeight="bold">
          BTC
        </Box>{" "}
        {btcDominance}
      </Box>
      <Box mr={4}>
        <Box as="span" fontWeight="bold">
          ETH
        </Box>{" "}
        {ethDominance}
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
          {totalMarketCap} <MarketArrow marketDirection={marketDirection} />
        </Box>
      </Box>
    </Bar>
  );
};

export default memo(InfoBar);
