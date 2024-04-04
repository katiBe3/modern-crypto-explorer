import React, { memo } from "react";
import { Box } from "@chakra-ui/react";
import Bar from "../layout/Bar";
import MarketArrow from "./MarketArrow";
import NextHalvingInfo from "./NextHalvingInfo";
import useAssetStore from "../../stores/useAssetStore";

const InfoBar = memo(() => {
  const {
    totalMarketCap,
    btcDominance,
    ethDominance,
    totalVolume,
    marketDirection,
  } = useAssetStore((state) => ({
    totalMarketCap: state.totalMarketCap,
    btcDominance: state.btcDominance,
    ethDominance: state.ethDominance,
    totalVolume: state.totalVolume,
    marketDirection: state.marketDirection,
  }));

  return (
    <Bar>
      <Box mr={4}>
        <Box as="span" fontWeight="bold">BTC</Box> {btcDominance}%
      </Box>
      <Box mr={4}>
        <Box as="span" fontWeight="bold">ETH</Box> {ethDominance}%
      </Box>
      <Box mr={4}>
        24h Vol: <Box as="span" fontWeight="bold">${totalVolume} Billion</Box>
      </Box>
      <Box mr={4}>
        Total Market Cap: <Box as="span" fontWeight="bold">${totalMarketCap} Trillion</Box> <MarketArrow marketDirection={marketDirection} />
      </Box>
      <Box mr={4}>
        <NextHalvingInfo showTooltip={true} />
      </Box>
    </Bar>
  );
});

export default InfoBar;
