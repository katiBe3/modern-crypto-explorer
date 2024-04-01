import React, { useState, useEffect } from "react";
import { Flex, Text, Skeleton } from "@chakra-ui/react";
import Card from "../../layout/Card";

const WhaleWatchCard = () => {
  const [highestTrade, setHighestTrade] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWhaleActivity = async () => {
      try {
        const response = await fetch("https://api.coincap.io/v2/trades?exchange=poloniex&limit=100");
        if (!response.ok) {
          throw new Error("Failed to fetch recent trades");
        }
        const data = await response.json();

        const btcUsdTrades = data.data.filter((trade) => trade.baseSymbol === "BTC" && trade.quoteSymbol === "USD");

        const sortedTrades = btcUsdTrades.sort((a, b) => b.volume - a.volume);

        const whaleTrade = sortedTrades[0];

        setHighestTrade(whaleTrade);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching whale activity:", error.message);
        setError("Error fetching whale activity: " + error.message);
        setIsLoading(false);
      }
    };

    fetchWhaleActivity();
  }, []);

  return (
    <Card title="🐋 Whale Watch">
      <Flex align="center">
        <Skeleton isLoaded={!isLoading} height="24px">
          {error !== null ? (
            <Text>{error}</Text>
          ) : highestTrade !== null ? (
            <>
              <Text>BTC whales are making waves! 🌊 Their moves could signal a big splash in the market. Here's the latest trade:</Text>
              <Text fontWeight="bold" textAlign="center" color="green.500" fontSize="2xl" mt={2}>
                ${parseFloat(highestTrade.price).toLocaleString()}
              </Text>
            </>
          ) : (
            <Text>No significant whale activity detected within the last hour. Keep an eye on the market for updates. 👀</Text>
          )}
        </Skeleton>
      </Flex>
    </Card>
  );
};

export default WhaleWatchCard;
