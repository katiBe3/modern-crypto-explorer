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
  const [assetsData, setAssetsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.coincap.io/v2/assets");
        const data = await response.json();
        setAssetsData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box align="center">
      <Header />
      <MarketTeaser />
      <FearGreedIndex />
      <CryptoTable assetsData={assetsData} loading={loading} />
      <InformationPanels />
      <NewsletterSubscription />
      <Footer />
    </Box>
  );
};
export default Index;
