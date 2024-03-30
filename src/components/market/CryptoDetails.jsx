import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const CryptoDetails = ({ assets }) => {
  const { id } = useParams();
  const crypto = assets.find((asset) => asset.id === id);

  if (!crypto) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        {crypto.name} ({crypto.symbol})
      </Heading>
      <Text fontSize="2xl" mb={2}>
        Price: ${parseFloat(crypto.priceUsd).toLocaleString()}
      </Text>
      <Text fontSize="xl" mb={2}>
        Market Cap: ${parseInt(crypto.marketCapUsd).toLocaleString()}
      </Text>
      <Text fontSize="xl" mb={2}>
        Volume (24h): ${parseInt(crypto.volumeUsd24Hr).toLocaleString()}
      </Text>
      {}
    </Box>
  );
};

export default CryptoDetails;
