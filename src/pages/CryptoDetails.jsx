import React from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Heading } from "@chakra-ui/react";
import NewsSection from "../components/news/NewsSection";
import ExchangeTable from "../components/market/table/ExchangeTable";

const CryptoDetails = ({ assets }) => {
  const { id } = useParams();
  const crypto = assets.find((asset) => asset.id === id);

  if (!crypto) {
    return <Text>Cryptocurrency not found.</Text>;
  }

  return (
    <Box px={8} py={4} maxWidth="1200px" mx="auto" textAlign="center">
      <Heading as="h1" size="xl" mb={4} textAlign="center">
        {crypto.name} ({crypto.symbol}) - <Text as="span" color="green.500">{parseFloat(crypto.priceUsd) >= 100 ? `$${parseInt(crypto.priceUsd).toLocaleString()}` : parseFloat(crypto.priceUsd) >= 1 ? `$${parseFloat(crypto.priceUsd).toLocaleString()}` : `$${parseFloat(crypto.priceUsd).toFixed(8)}`}</Text>
      </Heading>
      <ExchangeTable cryptoId={crypto.id} />
      <NewsSection cryptos={crypto.symbol} />
    </Box>
  );
};

export default CryptoDetails;
