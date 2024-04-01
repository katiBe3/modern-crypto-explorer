import React, { useState, useEffect } from "react";
import { Flex, Text, Skeleton } from "@chakra-ui/react";
import Card from "../../layout/Card";

const WhaleWatchCard = () => {
  const [highestTransaction, setHighestTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchWhaleActivity = async () => {
      try {
        const transactionsResponse = await fetch("https://blockstream.info/api/mempool/recent");
        if (!transactionsResponse.ok) {
          throw new Error("Failed to fetch recent transactions");
        }
        const transactions = await transactionsResponse.json();

        const highestTx = transactions.reduce((prev, current) => (prev.value > current.value ? prev : current));

        const priceResponse = await fetch("https://api.coincap.io/v2/assets/bitcoin");
        if (!priceResponse.ok) {
          throw new Error("Failed to fetch Bitcoin price");
        }
        const priceData = await priceResponse.json();
        const bitcoinPrice = parseFloat(priceData.data.priceUsd);

        const usdAmount = (highestTx.value / 100000000) * bitcoinPrice;

        if (initialLoad) {
          // On initial load, simply show the highest transaction amount
          setHighestTransaction({ ...highestTx, usdAmount });
        } else {
          // After initial load, update only if the new amount is higher than 1 million
          if (usdAmount > 1000000) {
            setHighestTransaction({ ...highestTx, usdAmount });
          }
        }

        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching whale activity:", error.message);
        setError("Error fetching whale activity: " + error.message);
        setIsLoading(false);
      }
    };

    fetchWhaleActivity();

    // Fetch new data every 10 seconds
    const interval = setInterval(fetchWhaleActivity, 10000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [initialLoad]); // Added initialLoad to the dependency array

  useEffect(() => {
    // Set initialLoad to false after the first load
    setInitialLoad(false);
  }, []);

  return (
    <Card title="🐋 Whale Watch">
      <Flex align="center">
        <Skeleton isLoaded={!isLoading} height="24px">
          {error !== null ? (
            <Text>{error}</Text>
          ) : highestTransaction !== null ? (
            <>
              <Text>BTC whales are making waves! 🌊 Here's the latest transaction:</Text>
              <Text fontWeight="bold" textAlign="center" color="green.500" fontSize="2xl" mt={2}>
                ${parseInt(highestTransaction.usdAmount).toLocaleString()} 
              </Text>
              <Text fontWeight="bold" textAlign="center" color="gray.500" fontSize="md">
                {(highestTransaction.value / 100000000).toFixed(2)} BTC
              </Text>
            </>
          ) : (
            <Text>No significant whale activity detected. Keep an eye on the market for updates. 👀</Text>
          )}
        </Skeleton>
      </Flex>
    </Card>
  );
};

export default WhaleWatchCard;
