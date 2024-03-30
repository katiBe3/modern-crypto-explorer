import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import Card from "../../layout/Card";

const WhaleWatchCard = () => {
  const [whaleActivity, setWhaleActivity] = useState(null);

  useEffect(() => {
    const fetchWhaleActivity = async () => {
      try {
        const response = await fetch("https://api.blockchain.com/v3/exchange/l3/{symbol}");
        if (!response.ok) {
          throw new Error("Failed to fetch whale activity");
        }
        const data = await response.json();

        const threshold = 100;
        const largeTrades = data.filter((trade) => parseFloat(trade.quantity) >= threshold);

        const formattedTrades = largeTrades.map((trade) => ({
          symbol: trade.symbol,
          quantity: parseFloat(trade.quantity),
          timestamp: new Date(trade.timestamp).toLocaleString(),
        }));

        return formattedTrades;
      } catch (error) {
        console.error("Error fetching whale activity:", error.message);
        return null;
      }
    };

    fetchWhaleActivity().then((activity) => {
      setWhaleActivity(activity);
    });
  }, []);

  return (
    <Card title="🐋 Whale Watch">
      <Flex align="center">
        {whaleActivity !== null ? (
          <>
            {whaleActivity.length > 0 ? (
              <div>
                <p>Recent large trades:</p>
                <ul>
                  {whaleActivity.map((trade, index) => (
                    <li key={index}>
                      {trade.quantity} {trade.symbol} at {trade.timestamp}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <span>No significant whale activity detected at the moment.</span>
            )}
          </>
        ) : (
          <span>Loading whale activity...</span>
        )}
      </Flex>
    </Card>
  );
};

export default WhaleWatchCard;
