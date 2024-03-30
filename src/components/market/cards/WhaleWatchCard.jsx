import React, { useState, useEffect } from "react";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Text } from "@chakra-ui/react";
import Card from "../../layout/Card";

const WhaleWatchCard = () => {
  const [whaleActivities, setWhaleActivities] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWhaleActivity = async () => {
      try {
        const symbols = ["BTC-USD", "ETH-USD", "BNB-USD"];
        const thresholdUSD = 100000;
        const formattedTrades = {};

        // Fetch the current cryptocurrency price
        for (const symbol of symbols) {
          const response = await fetch(`https://api.blockchain.com/v3/exchange/tickers/${symbol}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch price for ${symbol}`);
          }
          const data = await response.json();
          const price = parseFloat(data.last_trade_price);

          const tradeResponse = await fetch(`https://api.blockchain.com/v3/exchange/l2/${symbol}`);
          if (!tradeResponse.ok) {
            throw new Error(`Failed to fetch whale activity for ${symbol}`);
          }
          const tradeData = await tradeResponse.json();

          const recentTrades = tradeData.bids
            .concat(tradeData.asks)
            .filter((trade) => parseFloat(trade.px) * parseFloat(trade.qty) >= thresholdUSD / price)
            .sort((a, b) => parseFloat(b.px) * parseFloat(b.qty) - parseFloat(a.px) * parseFloat(a.qty))
            .slice(0, 5);

          formattedTrades[symbol] = recentTrades.map((trade) => ({
            amount: parseFloat(trade.qty),
            amountUSD: parseFloat(trade.qty) * price,
            symbol: symbol.split("-")[0],
            timestamp: new Date(trade.timestamp).toLocaleString(),
          }));
        }

        setWhaleActivities(formattedTrades);
        setError(null);
      } catch (error) {
        console.error("Error fetching whale activity:", error.message);
        setError("Error fetching whale activity: " + error.message);
      }
    };

    fetchWhaleActivity();
  }, []);

  return (
    <Card title="🐋 Whale Watch">
      {error !== null ? (
        <Text>{error}</Text>
      ) : (
        <Tabs>
          <TabList>
            <Tab>BTC</Tab>
            <Tab>ETH</Tab>
            <Tab>BNB</Tab>
          </TabList>
          <TabPanels>
            {Object.entries(whaleActivities).map(([symbol, activity]) => (
              <TabPanel key={symbol}>
                <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="md" p={4} fontFamily="monospace" fontSize="sm">
                  {activity && activity.length > 0 ? (
                    activity.map((trade, index) => (
                      <Text key={index}>
                        [{new Date(trade.timestamp).toLocaleTimeString()}] {trade.symbol}: {trade.amount.toFixed(4)} ({trade.amountUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD)
                      </Text>
                    ))
                  ) : (
                    <Text>No significant whale activity detected for {symbol.split("-")[0]} at the moment.</Text>
                  )}
                </Box>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      )}
    </Card>
  );
};

export default WhaleWatchCard;
