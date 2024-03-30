import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import Card from "../../layout/Card";

const WhaleWatchCard = () => {
  const [whaleActivities, setWhaleActivities] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWhaleActivity = async () => {
      try {
        // Fetch all recent trades
        const response = await fetch("https://api.blockchain.com/v3/exchange/l3/{symbol}");
        if (!response.ok) {
          throw new Error("Failed to fetch whale activity");
        }
        const data = await response.json();

        // Calculate the timestamp for 24 hours ago
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);

        // Filter trades that occurred within the last day for BTC and ETH symbols
        const threshold = 100;
        const formattedTrades = {};
        ["BTC-USD", "ETH-USD"].forEach(symbol => {
          const recentTrades = data.filter(
            (trade) => trade.symbol === symbol &&
            parseFloat(trade.quantity) >= threshold &&
            new Date(trade.timestamp) >= twentyFourHoursAgo
          );

          formattedTrades[symbol] = recentTrades.map((trade) => ({
            quantity: parseFloat(trade.quantity),
            timestamp: new Date(trade.timestamp).toLocaleString(),
          }));
        });

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
            ) : (
              <>
                {activity && activity.length > 0 ? (
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
                  <span>No significant whale activity detected for {symbol} at the moment.</span>
                )}
              </>
            )}
          </div>
        ))}
      </Flex>
    </Card>
  );
};

export default WhaleWatchCard;
