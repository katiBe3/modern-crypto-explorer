import React, { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import Card from "../../layout/Card";
import CardSkeleton from "../../layout/CardSkeleton";

const WhaleWatchCard = () => {
  const [highestTransaction, setHighestTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchWhaleActivity = async () => {
      try {
        <>
          {isLoading || error ? (
            <CardSkeleton />
          ) : (
            <Card title="🐋 Whale Watch">
              <Flex align="center">
                {highestTransaction ? (
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
              </Flex>
            </Card>
          )}
        </>;
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
        <CardSkeleton isLoaded={!isLoading} height="24px">
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
        </CardSkeleton>
      </Flex>
    </Card>
  );
};

export default WhaleWatchCard;
