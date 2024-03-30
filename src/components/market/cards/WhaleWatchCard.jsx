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
        const symbol = "BTC-USD"; // Only BTC symbol
        const thresholdUSD = 10000; // Threshold of $10,000 USD

        // Fetch recent trades
        // Fetch recent trades
        const tradeResponse = await fetch(`https://api.blockchain.com/v3/exchange/l2/${symbol}`);
        if (!tradeResponse.ok) {
          throw new Error(`Failed to fetch whale activity for ${symbol}`);
        }
        const tradeData = await tradeResponse.json();

        // Filter recent trades within the last hour and with amount greater than threshold
        const currentTime = new Date();
        const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);

        const recentTrades = tradeData.bids.concat(tradeData.asks).filter((trade) => new Date(trade.timestamp) >= oneHourAgo && parseFloat(trade.px) * parseFloat(trade.qty) >= thresholdUSD);

        if (recentTrades.length > 0) {
          // Find the highest trade
          let maxTrade = recentTrades[0];
          for (let i = 1; i < recentTrades.length; i++) {
            if (parseFloat(recentTrades[i].px) > parseFloat(maxTrade.px)) {
              maxTrade = recentTrades[i];
            }
          }

          const amountUSD = parseFloat(maxTrade.qty) * parseFloat(maxTrade.px);
          const timestamp = new Date(maxTrade.timestamp).toLocaleTimeString();
          setHighestTrade({ amountUSD, timestamp });
        } else {
          setHighestTrade(null);
        }

        setError(null);
        setIsLoading(false);
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
              <Text>BTC whales are making waves! 🌊 Their moves could signal a big splash in the market. Stay alert and ride the tide!</Text>
              <Text fontWeight="bold" textAlign="center">
                The highest trade in the last hour was ${highestTrade.amountUSD.toLocaleString()} at {highestTrade.timestamp}.
              </Text>
            </>
          ) : (
            <Text>No significant whale activity detected at the moment. Keep an eye on the market for updates. 👀</Text>
          )}
        </Skeleton>
      </Flex>
    </Card>
  );
};

export default WhaleWatchCard;
