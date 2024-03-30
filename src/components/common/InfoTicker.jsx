import React, { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import Bar from "../layout/Bar";
import MarketArrow from "./MarketArrow";

const InfoTicker = ({ formattedMarketData = {} }) => {
  const { btcDominance, ethDominance, totalVolume, totalMarketCap, marketDirection } = formattedMarketData;
  const [tickerIndex, setTickerIndex] = useState(0);

  // Define ticker data options
  const tickerData = [
    { label: "Dominance", value: `BTC: ${btcDominance} - ETH: ${ethDominance}`, hasArrow: false },
    { label: "Market Cap", value: `${totalMarketCap}`, hasArrow: false },
    { label: "24h Vol", value: `${totalVolume}`, hasArrow: true }
  ];

  useEffect(() => {
    // Function to cycle through ticker data every 5 seconds
    const interval = setInterval(() => {
      setTickerIndex(prevIndex => (prevIndex + 1) % tickerData.length);
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [tickerData]); // useEffect will re-run if tickerData changes

  return (
    <Bar>
      {/* Render current ticker data based on tickerIndex */}
      <Text color="white" fontSize="sm">
        <Text as="span" fontWeight="bold">{tickerData[tickerIndex].label}:</Text>{" "}
        <Text as="span" fontWeight="normal">{tickerData[tickerIndex].value} </Text>
        {tickerData[tickerIndex].hasArrow && <MarketArrow marketDirection={marketDirection} />}
      </Text>
    </Bar>
  );
};

export default InfoTicker;
