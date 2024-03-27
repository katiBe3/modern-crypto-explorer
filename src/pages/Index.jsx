import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import Header from "../components/layout/Header";
import InfoBar from "../components/common/InfoBar.jsx";
import MarketTeaser from "../components/market/MarketTeaser";
import FearGreedIndex from "../components/market/FearGreedIndex";
import CryptoTable from "../components/market/CryptoTable";
import NewsletterSubscription from "../components/common/NewsletterSubscription";
import Footer from "../components/layout/Footer";

const Index = () => {
  const [favorites, setFavorites] = useState({});
  const [assets, setAssets] = useState([]);
  const [bitcoinData, setBitcoinData] = useState(null);
  const [historicalDataLastFetched, setHistoricalDataLastFetched] = useState(null);

  const fetchAssetsRef = useRef();
  const historicalDataFetchRef = useRef();

  const fetchAssets = useCallback(async () => {
    const response = await fetch("https://api.coincap.io/v2/assets");
    const data = await response.json();
    setAssets(data.data);
  }, []);

  const fetchHistoricalData = useCallback(async () => {
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

    if (historicalDataLastFetched && historicalDataLastFetched > twentyFourHoursAgo) {
      return;
    }

    const endDate = new Date().getTime();
    const startDate = endDate - 60 * 24 * 60 * 60 * 1000;
    const response = await fetch(`https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=${startDate}&end=${endDate}`);
    const data = await response.json();
    setBitcoinData(data.data);
    setHistoricalDataLastFetched(Date.now());
  }, [historicalDataLastFetched]);

  useEffect(() => {
    fetchAssetsRef.current = fetchAssets;
    historicalDataFetchRef.current = fetchHistoricalData;
  }, [fetchAssets, fetchHistoricalData]);

  useEffect(() => {
    fetchAssets();
    fetchHistoricalData();
  }, [fetchAssets, fetchHistoricalData]);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <InfoBar assets={assets} />
      <Header />
      <MarketTeaser assets={assets} mb={4} />
      <FearGreedIndex bitcoinData={bitcoinData} mt={4} />
      <CryptoTable assets={assets} my={8} favorites={favorites} setFavorites={setFavorites} />
      <NewsletterSubscription />
      <Footer />
    </Box>
  );
};

export default Index;
