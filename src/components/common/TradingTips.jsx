import React, { useState } from "react";
import { Text, Box, Heading } from "@chakra-ui/react";
import { tradingTips } from  "../../data/TradingTips";

const TradingTips = () => {
  // State to store the currently displayed trading tip
  const [currentTip] = useState(getRandomTradingTip());

  // Function to select a random trading tip
  function getRandomTradingTip() {
    const randomIndex = Math.floor(Math.random() * tradingTips.length);
    return tradingTips[randomIndex];
  }

  return (
    <Box bg="#5A4FCF" width="full" py={{ base: 10, md: 20 }} px={4} align="center">
      <Box maxWidth="640px">
      <Heading textAlign="center" color="white" fontWeight="bold" mb={2} fontSize={{ base: "2xl", md: "3xl" }}>
        {currentTip.title}
        </Heading>
      <Text textAlign="center" color="white" mb={4} fontSize={{ base: "md", md: "lg" }}>
        {currentTip.text}
      </Text>
      </Box>
    </Box>
  );
};

export default TradingTips;
