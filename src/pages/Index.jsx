import React, { useContext } from "react";
import MarketTeaser from "../components/market/MarketTeaser";
import FearGreedIndex from "../components/market/FearGreedIndex";
import CryptoTable from "../components/market/CryptoTable";
import NewsletterSubscription from "../components/common/NewsletterSubscription";
import { DataContext } from "../contexts/DataContext.jsx";
import Layout from "../components/layout/Layout";

const Index = () => {
  const { assets, bitcoinData } = useContext(DataContext);

  return (
    <Layout>
      <MarketTeaser assets={assets} mb={4} />
      <FearGreedIndex bitcoinData={bitcoinData} mt={4} />
      <CryptoTable />
      <NewsletterSubscription />
    </Layout>
  );
};

export default Index;
