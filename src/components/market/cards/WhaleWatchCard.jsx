import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import Card from "../../layout/Card";

const WhaleWatchCard = () => {
  const [whaleActivities, setWhaleActivities] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWhaleActivity = async () => {
      try {
        const symbol = "BTC-USD"; // Only BTC symbol
        const thresholdUSD = 1000000; // Threshold in USD
        const formattedTrades = {};

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
        const recentTrades = tradeData.bids.concat(tradeData.asks).filter((trade) => parseFloat(trade.px) * parseFloat(trade.qty) >= thresholdUSD / priceBTC);

        formattedTrades[symbol] = recentTrades.map((trade) => ({
          amountBTC: parseFloat(trade.qty), // Trade amount in BTC
          amountUSD: parseFloat(trade.qty) * priceBTC, // Equivalent trade amount in USD
          symbol: symbol.split('-')[0], // Extracting BTC or ETH from the symbol
          timestamp: new Date(trade.timestamp).toLocaleString(),
        }));

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
                          {trade.amountBTC.toFixed(8)} {trade.symbol} at {trade.timestamp} (BTC {trade.amountBTC.toFixed(8)}) - USD {trade.amountUSD.toFixed(2)}
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
