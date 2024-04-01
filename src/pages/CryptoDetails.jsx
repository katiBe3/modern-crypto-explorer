import React from "react";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import NewsSection from "../components/news/NewsSection";
import ExchangeTable from "../components/market/ExchangeTable";

const CryptoDetails = ({ assets }) => {
  const { id } = useParams();
  const crypto = assets.find((asset) => asset.id === id);

  if (!crypto) {
    return <Text>Cryptocurrency not found.</Text>;
  }

  return (
    <Box mx="auto" maxWidth="1200px">
      <Text fontSize="2xl" fontWeight="bold">
        {crypto.name} ({crypto.symbol})
      </Text>
      <Text>Price: ${parseFloat(crypto.priceUsd).toLocaleString()}</Text>
      <Text>Market Cap: ${parseInt(crypto.marketCapUsd).toLocaleString()}</Text>
      <Text>Volume (24h): ${parseInt(crypto.volumeUsd24Hr).toLocaleString()}</Text>
      <NewsSection cryptos={crypto.symbol} />
      <ExchangeTable cryptoId={crypto.id} />
    </Box>
  );
};

export default CryptoDetails;
