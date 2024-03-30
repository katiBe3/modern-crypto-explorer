import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const TradingTipCard = ({ tip }) => {
  return (
    <Box bg="gray.50" borderRadius="md" p={6} boxShadow="md" mb={8} maxWidth="640">
      <Heading as="h2" size="xl" mb={4}>
        {tip.title}
      </Heading>
      <Text fontSize="lg">{tip.text}</Text>
    </Box>
  );
};

export default TradingTipCard;
