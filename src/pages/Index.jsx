import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import Header from "../components/layout/Header";
import MarketTeaser from "../components/market/MarketTeaser";
import FearGreedIndex from "../components/market/FearGreedIndex";
import CryptoTable from "../components/market/CryptoTable";
import InformationPanels from "../components/market/InformationPanels";
import NewsletterSubscription from "../components/common/NewsletterSubscription";
import Footer from "../components/layout/Footer";
import { bitcoinHistoricalData } from "../data/bitcoinHistoricalData";

const Index = ({ setFavorites }) => {
  const [assets, setAssets] = useState([]);
  const [bitcoinData, setBitcoinData] = useState(null);
  const [historicalDataLastFetched, setHistoricalDataLastFetched] = useState(null);

  const fetchAssetsRef = useRef();
  const intervalRef = useRef();
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

    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const response = await fetch(`https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=${startDate}&end=${endDate}`);
    const data = await response.json();

    bitcoinHistoricalData.length = 0;
    bitcoinHistoricalData.push(...data);

    setHistoricalDataLastFetched(Date.now());
  }, [historicalDataLastFetched]);

  useEffect(() => {
    fetchAssetsRef.current = fetchAssets;
    historicalDataFetchRef.current = fetchHistoricalData;
  }, [fetchAssets, fetchHistoricalData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.coincap.io/v2/assets/bitcoin");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBitcoinData(data.data);
      } catch (error) {
        console.error("Error fetching Bitcoin data:", error);
      }
      await fetchAssetsRef.current();
    };

    fetchData();

    intervalRef.current = setInterval(fetchData, 5000);

    if (bitcoinHistoricalData.length === 0) {
      historicalDataFetchRef.current();
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <MarketTeaser bitcoinData={bitcoinData} />
      <FearGreedIndex assets={assets} />
      <CryptoTable assets={assets} my={8} setFavorites={setFavorites} />
      <InformationPanels assets={assets} />
      <NewsletterSubscription />
      <Footer />
    </Box>
  );
};

export default Index;
