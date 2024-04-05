import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Heading, useTheme } from "@chakra-ui/react";
import NewsSection from "../components/news/NewsSection";
import ExchangeTable from "../components/market/table/ExchangeTable";
import CryptoChart from "../components/market/CryptoChart";
import useAssetStore from '../stores/useAssetStore'; // Import the store

const CryptoDetails = () => {
  const { id } = useParams();
  const theme = useTheme();
  const { assets, fetchAssets } = useAssetStore((state) => ({
    assets: state.assets,
    fetchAssets: state.fetchAssets,
  }));
  const crypto = assets.find((asset) => asset.id === id);
  const [historicalData, setHistoricalData] = useState(null);

  useEffect(() => {
    if (assets.length === 0) {
      fetchAssets(); // Fetch assets if not already loaded
    }
  }, [assets, fetchAssets]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (!crypto) return;

      const endDate = new Date().getTime();
      const startDate = endDate - 3 * 30 * 24 * 60 * 60 * 1000; // Fetching 3 months of data
      const interval = "d1";

      const response = await fetch(`https://api.coincap.io/v2/assets/${crypto.id}/history?interval=${interval}&start=${startDate}&end=${endDate}`);
      const data = await response.json();

      const formattedData = data.data.map((item) => ({
        time: new Date(item.time).toISOString().split('T')[0], // Convert UNIX timestamp to date string
        value: parseFloat(item.priceUsd),
      }));

      setHistoricalData(formattedData);
    };

    fetchHistoricalData();
  }, [crypto]);

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
      <Box my={8} align="center">
        <CryptoChart data={historicalData} brandColor={theme.colors.brand.main} />
      </Box>
      <ExchangeTable cryptoId={crypto.id} />
      <NewsSection cryptos={crypto.symbol} />
    </Box>
  );
};

export default CryptoDetails;
