import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Header from "../components/layout/Header";
import MarketTeaser from "../components/market/MarketTeaser";
import FearGreedIndex from "../components/market/FearGreedIndex";
import CryptoTable from "../components/market/CryptoTable";
import InformationPanels from "../components/market/InformationPanels";
import NewsletterSubscription from "../components/common/NewsletterSubscription";
import Footer from "../components/layout/Footer";

const Index = () => {
  const [assets, setAssets] = useState([]);
  const [bitcoinData, setBitcoinData] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      const response = await fetch("https://api.coincap.io/v2/assets?limit=100");
      const data = await response.json();
      setAssets(data.data);
    };

    const fetchBitcoinData = async () => {
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
    };

    fetchAssets();
    fetchBitcoinData();
  }, []);

  return (
    <Box align="center">
      <Header />
      <MarketTeaser bitcoinData={bitcoinData} my={8} />
      <FearGreedIndex assets={assets} />
      <CryptoTable assets={assets} my={8} />
      <InformationPanels assets={assets} />
      <NewsletterSubscription />
      <Footer />
    </Box>
  );
};

export default Index;
