import React from "react";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

const CryptoDetails = ({ assets }) => {
  const { id } = useParams();
  const crypto = assets.find((asset) => asset.id === id);

  if (!crypto) {
    return <Text>Cryptocurrency not found.</Text>;
  }

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">
        {crypto.name} ({crypto.symbol})
      </Text>
      <Text>Price: ${parseFloat(crypto.priceUsd).toLocaleString()}</Text>
      <Text>Market Cap: ${parseInt(crypto.marketCapUsd).toLocaleString()}</Text>
      <Text>Volume (24h): ${parseInt(crypto.volumeUsd24Hr).toLocaleString()}</Text>
    </Box>
  );
};

export default CryptoDetails;