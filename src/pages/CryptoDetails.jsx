import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Heading, Button, ButtonGroup } from "@chakra-ui/react";
import NewsSection from "../components/news/NewsSection";
import ExchangeTable from "../components/market/table/ExchangeTable";
import CryptoChart from "../components/market/CryptoChart";

const CryptoDetails = ({ assets }) => {
  const { id } = useParams();
  const crypto = assets.find((asset) => asset.id === id);
  const [selectedRange, setSelectedRange] = useState("1D");
  const [historicalData, setHistoricalData] = useState(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      const endDate = new Date().getTime();
      let startDate;
      let interval;

      switch (selectedRange) {
        case "1D":
          startDate = endDate - 24 * 60 * 60 * 1000;
          interval = "m5";
          break;
        case "7D":
          startDate = endDate - 7 * 24 * 60 * 60 * 1000;
          interval = "h1";
          break;
        case "1M":
          startDate = endDate - 30 * 24 * 60 * 60 * 1000;
          interval = "h6";
          break;
        case "ALL":
          startDate = 0;
          interval = "d1";
          break;
        default:
          return;
      }

      const response = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=${interval}&start=${startDate}&end=${endDate}`);
      const data = await response.json();
      setHistoricalData(data.data);
    };

    fetchHistoricalData();
  }, [id, selectedRange]);

  if (!crypto) {
    return <Text>Cryptocurrency not found.</Text>;
  }

  return (
    <Box px={8} py={4} maxWidth="1200px" mx="auto" textAlign="center">
      <Heading as="h1" size="xl" mb={4} textAlign="center">
        {crypto.name} ({crypto.symbol}) -{" "}
        <Text as="span" color="green.500">
          {parseFloat(crypto.priceUsd) >= 100 ? `$${parseInt(crypto.priceUsd).toLocaleString()}` : parseFloat(crypto.priceUsd) >= 1 ? `$${parseFloat(crypto.priceUsd).toLocaleString()}` : `$${parseFloat(crypto.priceUsd).toFixed(8)}`}
        </Text>
      </Heading>
      <Box my={8}>
        <ButtonGroup mb={4}>
          {["1D", "7D", "1M", "ALL"].map((range) => (
            <Button key={range} onClick={() => setSelectedRange(range)} variant={selectedRange === range ? "solid" : "outline"} colorScheme="blue">
              {range}
            </Button>
          ))}
        </ButtonGroup>
        <CryptoChart data={historicalData} color="blue" />
      </Box>
      <ExchangeTable cryptoId={crypto.id} />
      <NewsSection cryptos={crypto.symbol} />
    </Box>
  );
};

export default CryptoDetails;
