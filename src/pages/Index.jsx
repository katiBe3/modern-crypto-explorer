import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import Header from "../components/layout/Header";
import InfoBar from "../components/common/InfoBar.jsx";
import MarketTeaser from "../components/market/MarketTeaser";
import FearGreedIndex from "../components/market/FearGreedIndex";
import CryptoTable from "../components/market/CryptoTable";
import NewsletterSubscription from "../components/common/NewsletterSubscription";
import Footer from "../components/layout/Footer";
import { DataContext } from "../contexts/DataContext.jsx";

const Index = () => {
  const { favorites, setFavorites, assets, bitcoinData } = useContext(DataContext);

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
