import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const TradingTipCard = ({ tip }) => {
  return (
    <Box id={tip.id} bg="gray.50" borderRadius="md" p={6} boxShadow="md" mb={8} maxWidth="640px" mx="auto">
      <Heading as="h2" size="xl" mb={4} textAlign="center">
        {tip.title}
      </Heading>
      <Text fontSize="lg">{tip.text}</Text>
    </Box>
  );
};

export default TradingTipCard;
