import React from "react";
import MarketTeaser from "../components/market/MarketTeaser";
import FearGreedIndexCard from "../components/market/cards/FearGreedIndexCard";
import WhaleWatchCard from "../components/market/cards/WhaleWatchCard";
import TopCryptoCard from "../components/market/cards/TopCryptoCard";
import CryptoTable from "../components/market/CryptoTable";
import TradingTips from "../components/common/TradingTips";
import { Grid, Box } from "@chakra-ui/react";
import CardSlider from "../components/common/CardSlider";

const Index = ({ assets, marketData }) => {
  const { bitcoinData, btcDominance, ethDominance, totalVolume, marketDirection, totalMarketCap } = marketData;
  return (
    <>
      <MarketTeaser assets={assets} mb={4} />
      <Box my={2} mx={{ base: 4, md: 8 }} maxWidth="1200px" height="210px">
        <CardSlider cards={[<TopCryptoCard assets={assets} />, <FearGreedIndexCard bitcoinData={bitcoinData} btcDominance={btcDominance} ethDominance={ethDominance} totalVolume={totalVolume} marketDirection={marketDirection} totalMarketCap={totalMarketCap} />, <WhaleWatchCard />]} />
      </Box>
      <CryptoTable assets={assets} />
      <TradingTips />
    </>
  );
};

export default Index;
