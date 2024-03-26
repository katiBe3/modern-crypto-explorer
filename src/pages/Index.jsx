import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "../components/layout/Header";
import MarketTeaser from "../components/market/MarketTeaser";
import FearGreedIndex from "../components/market/FearGreedIndex";
import CryptoTable from "../components/market/CryptoTable";
import InformationPanels from "../components/market/InformationPanels";
import NewsletterSubscription from "../components/common/NewsletterSubscription";
import Footer from "../components/layout/Footer";
import { cryptoData } from "../data/cryptoData";

const Index = () => {

  const marketCap = '2.79';
  const percentageChange = 7.2;

  return (
    <Box align="center">
      <Header />
      <MarketTeaser marketCap={marketCap} percentageChange={percentageChange} />
      <FearGreedIndex />
      <CryptoTable cryptoData={cryptoData} />
      <InformationPanels />
      <NewsletterSubscription />
      <Footer />
    </Box>
  );
};

export default Index;