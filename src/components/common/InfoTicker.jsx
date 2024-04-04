import React, { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import Bar from "../layout/Bar";
import MarketArrow from "./MarketArrow";
import useAssetStore from "../../stores/useAssetStore"; 

const InfoTicker = () => {
  const {
    btcDominance,
    ethDominance,
    totalMarketCap,
    totalVolume,
    marketDirection,
  } = useAssetStore(state => ({
    btcDominance: state.btcDominance,
    ethDominance: state.ethDominance,
    totalMarketCap: state.totalMarketCap,
    totalVolume: state.totalVolume,
    marketDirection: state.marketDirection,
  }));

  const [tickerIndex, setTickerIndex] = useState(0);

  const tickerData = [
    { label: "Dominance", value: `BTC: ${btcDominance}% - ETH: ${ethDominance}%`, hasArrow: false },
    { label: "Market Cap", value: `$${totalMarketCap} Trillion`, hasArrow: false },
    { label: "24h Vol", value: `$${totalVolume} Billion`, hasArrow: true }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex(prevIndex => (prevIndex + 1) % tickerData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tickerData]);

  return (
    <Bar>
      <Text color="white" fontSize="sm">
        <Text as="span" fontWeight="bold">{tickerData[tickerIndex].label}:</Text>{" "}
        <Text as="span" fontWeight="normal">{tickerData[tickerIndex].value} </Text>
        {tickerData[tickerIndex].hasArrow && <MarketArrow marketDirection={marketDirection} />}
      </Text>
    </Bar>
  );
};

export default InfoTicker;
