import React, { useState, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const MarketTeaser = () => {
  const [btcData, setBtcData] = useState(null);

  useEffect(() => {
    const fetchBtcData = async () => {
      try {
        const response = await fetch("https://api.coincap.io/v2/assets/bitcoin");
        const data = await response.json();
        setBtcData(data.data);
      } catch (error) {
        console.error("Error fetching BTC data:", error);
      }
    };

    fetchBtcData();
  }, []);

  if (!btcData) {
    return null;
  }

  const { marketCapUsd, changePercent24Hr } = btcData;
  const marketCap = (parseFloat(marketCapUsd) / 1e12).toFixed(2);
  const percentChange = parseFloat(changePercent24Hr).toFixed(2);
  const changeSign = percentChange > 0 ? "+" : "";

  return (
    <Box textAlign="center" my={4} mx={8}>
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
