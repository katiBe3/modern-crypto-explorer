import React, { useEffect } from "react";
import { Flex, Text, Skeleton } from "@chakra-ui/react";
import Card from "../../layout/Card";
import useWhaleWatchStore from "../../../stores/useWhaleWatchStore";

const WhaleWatchCard = () => {
  const { highestTransaction, error, isLoading, message, fetchWhaleActivity } = useWhaleWatchStore(state => ({
    highestTransaction: state.highestTransaction,
    error: state.error,
    isLoading: state.isLoading,
    message: state.message, // Add message to state properties
    fetchWhaleActivity: state.fetchWhaleActivity,
  }));

  useEffect(() => {
    fetchWhaleActivity();
    const interval = setInterval(fetchWhaleActivity, 10000);
    return () => clearInterval(interval);
  }, [fetchWhaleActivity]);

  return (
    <Card title="🐋 Whale Watch">
      <Flex align="center">
        <Skeleton isLoaded={!isLoading} height="24px">
          {error ? (
            <Text>{error}</Text>
          ) : highestTransaction ? (
            <>
              <Text>{message}</Text>
              <Text fontWeight="bold" textAlign="center" color="green.500" fontSize="2xl" mt={2}>
                ${parseInt(highestTransaction.usdAmount).toLocaleString()} 
              </Text>
              <Text fontWeight="bold" textAlign="center" color="gray.500" fontSize="md">
                {(highestTransaction.out.reduce((prev, current) => Math.max(prev, current.value), 0) / 100000000).toFixed(2)} BTC
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
