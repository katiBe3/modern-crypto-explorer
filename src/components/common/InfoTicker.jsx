import React, { useState, useEffect } from "react";
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";

const InfoTicker = () => {
  const [tickerData, setTickerData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const sampleData = ["BTC dominance: 40.5%", "ETH gas fees: 20 Gwei", "Total market cap: $1.2T"];
    setTickerData(sampleData);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sampleData.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Box bg="gray.800" py={2} px={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="white" fontWeight="bold">
          {tickerData[currentIndex]}
        </Text>
        <IconButton icon={<FaTimes />} size="sm" variant="unstyled" color="white" onClick={handleClose} aria-label="Close ticker" />
      </Flex>
    </Box>
  );
};

export default InfoTicker;
