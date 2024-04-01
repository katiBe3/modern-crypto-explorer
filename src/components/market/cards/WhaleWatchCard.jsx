import React, { useState, useEffect } from "react";
import { Flex, Text, Skeleton } from "@chakra-ui/react";
import Card from "../../layout/Card";

const WhaleWatchCard = () => {
  const [highestTransaction, setHighestTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWhaleActivity = async () => {
      try {
        const transactionsResponse = await fetch("https://blockstream.info/api/mempool/recent");
        if (!transactionsResponse.ok) {
          throw new Error("Failed to fetch recent transactions");
        }
        const transactions = await transactionsResponse.json();

        const highestTx = transactions.sort((a, b) => b.value - a.value)[0];

        // Removed duplicated code block, as it's unnecessary
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
          ) : highestTransaction !== null ? (
            <>
              <Text>BTC whales are making waves! 🌊 Their moves could signal a big splash in the market. Here's the latest big transaction:</Text>
              <Text fontWeight="bold" textAlign="center" color="green.500" fontSize="2xl" mt={2}>
                {(highestTransaction.value / 100000000).toFixed(2)} BTC
              </Text>
              <Text fontWeight="bold" textAlign="center" color="gray.500" fontSize="xl">
                (${highestTransaction.usdAmount.toLocaleString()})
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
