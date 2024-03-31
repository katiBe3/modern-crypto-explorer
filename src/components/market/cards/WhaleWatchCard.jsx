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
        const thresholdUSD = 100000;

        // Fetch the current cryptocurrency price
        const response = await fetch(`https://api.blockchain.com/v3/exchange/tickers/${symbol}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch price for ${symbol}`);
        }
        const data = await response.json();
        const priceBTC = parseFloat(data.last_trade_price);

        // Fetch recent trades
        const tradeResponse = await fetch(`https://api.blockchain.com/v3/exchange/l2/${symbol}`);
        if (!tradeResponse.ok) {
          throw new Error(`Failed to fetch whale activity for ${symbol}`);
        }
        const tradeData = await tradeResponse.json();

        // Filter recent trades based on the cryptocurrency threshold
        const recentTrades = tradeData.bids
          .concat(tradeData.asks)
          .filter((trade) => parseFloat(trade.px) * parseFloat(trade.qty) >= thresholdUSD / priceBTC);

        // Find the highest trade
        const highestTrade = recentTrades.length > 0 ? recentTrades[0] : null;

        setHighestTrade(highestTrade);
        setIsLoading(false); // Set isLoading to false once data is fetched
        setError(null);
      } catch (error) {
        console.error("Error fetching whale activity:", error.message);
        setError("Error fetching whale activity: " + error.message);
        setIsLoading(false); // Set isLoading to false in case of error
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
              <Text>BTC whales are making waves! 🌊 Their moves could signal a big splash in the market. Here's the highest trade in the last 60 minutes:</Text>
              <Text fontWeight="bold" textAlign="center">
                <Text color="green.500" fontSize="2xl" mt={2}>${parseFloat(highestTrade.px * highestTrade.qty).toLocaleString()}</Text>
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
