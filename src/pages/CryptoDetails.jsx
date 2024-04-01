import React from "react";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import NewsSection from "../components/news/NewsSection";
import ExchangeTable from "../components/market/table/ExchangeTable";

const CryptoDetails = ({ assets }) => {
  const { id } = useParams();
  const crypto = assets.find((asset) => asset.id === id);

  if (!crypto) {
    return <Text>Cryptocurrency not found.</Text>;
  }

  return (
    <Box mx="auto" maxWidth="1200px">
      <Text fontSize="2xl" fontWeight="bold">
      {crypto.name} ({crypto.symbol}) - <Text as="span" color="green.500">{parseFloat(crypto.priceUsd) >= 100 ? `$${parseInt(crypto.priceUsd).toLocaleString()}` : parseFloat(crypto.priceUsd) >= 1 ? `$${parseFloat(crypto.priceUsd).toLocaleString()}` : `$${parseFloat(crypto.priceUsd).toFixed(8)}`}</Text>
      </Text>
      <ExchangeTable cryptoId={crypto.id} />
      <NewsSection cryptos={crypto.symbol} />
    </Box>
  );
};

export default CryptoDetails;
