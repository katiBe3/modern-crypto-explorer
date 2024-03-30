import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import Card from "../../layout/Card";

const WhaleWatchCard = () => {
  const [whaleActivities, setWhaleActivities] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWhaleActivity = async () => {
      try {
        const symbols = ["BTC-USD", "ETH-USD"];
        const threshold = 100;
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);

        const formattedTrades = {};

        for (const symbol of symbols) {
          const response = await fetch(`https://api.blockchain.com/v3/exchange/l2/${symbol}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch whale activity for ${symbol}`);
          }
          const data = await response.json();

          const recentTrades = data.bids.concat(data.asks).filter((trade) => parseFloat(trade.px) * parseFloat(trade.qty) >= threshold && new Date(trade.timestamp) >= twentyFourHoursAgo);

          formattedTrades[symbol] = recentTrades.map((trade) => ({
            price: parseFloat(trade.px),
            quantity: parseFloat(trade.qty),
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
      <Flex align="center">
        {Object.entries(whaleActivities).map(([symbol, activity]) => (
          <div key={symbol}>
            {error !== null ? (
              <span>{error}</span>
            ) : activity && activity.length > 0 ? (
              <div>
                <p>Recent large trades for {symbol}:</p>
                <ul>
                  {activity.map((trade, index) => (
                    <li key={index}>
                      {trade.quantity} {symbol} at {trade.timestamp}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <span>No significant whale activity detected at the moment.</span>
            )}
          </div>
        ))}
      </Flex>
    </Card>
  );
};

export default WhaleWatchCard;
