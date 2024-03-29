import React from "react";
import MarketTeaser from "../components/market/MarketTeaser";
import FearGreedIndexCard from "../components/market/cards/FearGreedIndexCard";
import WhaleWatchCard from "../components/market/cards/WhaleWatchCard";
import TopCryptoCard from "../components/market/cards/TopCryptoCard";
import CryptoTable from "../components/market/CryptoTable";
import TradingTips from "../components/common/TradingTips";
import { Grid } from "@chakra-ui/react";

const Index = ({ assets, marketData }) => {
  const { bitcoinData, btcDominance, ethDominance, totalVolume, marketDirection, totalMarketCap } = marketData;
  return (
    <>
      <MarketTeaser assets={assets} mb={4} />
      <Grid templateColumns="repeat(3, 1fr)" gap={8} my={2} mx={8} maxWidth="1200px" alignItems="center">
          <TopCryptoCard assets={assets} ></TopCryptoCard>
          <FearGreedIndexCard bitcoinData={bitcoinData} btcDominance={btcDominance} ethDominance={ethDominance} totalVolume={totalVolume} marketDirection={marketDirection} totalMarketCap={totalMarketCap} mt={4} />
          <WhaleWatchCard />
      </Grid>
      <CryptoTable assets={assets} />
      <TradingTips />
    </>
  );
};

export default Index;
