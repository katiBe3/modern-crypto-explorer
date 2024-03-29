import React from "react";
import MarketTeaser from "../components/market/MarketTeaser";
import FearGreedIndexCard from "../components/market/cards/FearGreedIndexCard";
import WhaleWatchCard from "../components/market/cards/WhaleWatchCard";
import TopCryptoCard from "../components/market/cards/TopCryptoCard";
import CryptoTable from "../components/market/CryptoTable";
import TradingTips from "../components/common/TradingTips";
import { Grid, Box, useBreakpointValue } from "@chakra-ui/react";
import CardSlider from "../components/layout/CardSlider";

const Index = ({ assets, marketData }) => {
  const { bitcoinData, btcDominance, ethDominance, totalVolume, marketDirection, totalMarketCap } = marketData;
  const isMobile = useBreakpointValue({ base: true, md: false });

  const cards = [
    <TopCryptoCard assets={assets} />, 
    <FearGreedIndexCard bitcoinData={bitcoinData} btcDominance={btcDominance} ethDominance={ethDominance} totalVolume={totalVolume} marketDirection={marketDirection} totalMarketCap={totalMarketCap} />, 
    <WhaleWatchCard />
  ];

  const mobileCardSlider = isMobile && (
    <CardSlider cards={cards} />
  );

  const desktopCards = !isMobile && (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8} my={2} alignItems="center">
      { cards }
    </Grid>
  );

  return (
    <Box mx="auto" maxWidth="1200px">
      <MarketTeaser assets={assets} mb={4} />
      <Box my={2} height="210px">
        { mobileCardSlider }
        { desktopCards }
      </Box>
      <CryptoTable assets={assets} />
      <TradingTips />
    </Box>
  );
};

export default Index;
