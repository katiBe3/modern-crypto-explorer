import React, { Suspense } from "react";
import MarketTeaser from "../components/market/MarketTeaser";
import FearGreedIndexCard from "../components/market/cards/FearGreedIndexCard";
import WhaleWatchCard from "../components/market/cards/WhaleWatchCard";

const CryptoTable = React.lazy(() => import("../components/market/CryptoTable"));
import TradingTips from "../components/common/TradingTips";
import { Grid, Box, Flex, Show, Hide } from "@chakra-ui/react";
import CardSlider from "../components/layout/CardSlider";
import CryptoTrendCard from "../components/market/cards/CryptoTrendCard";

const Index = ({ assets, marketData }) => {
  const { bitcoinData, btcDominance, ethDominance, totalVolume, marketDirection, totalMarketCap } = marketData;

  const getTopAssets = (property, count, isAscending = false) =>
    assets
      .slice()
      .sort((a, b) => (isAscending ? a[property] - b[property] : b[property] - a[property]))
      .slice(0, count);

  const winningCryptos = getTopAssets("changePercent24Hr", 3, false);
  const biggestDropCryptos = getTopAssets("changePercent24Hr", 3, true);
  const highVolumeCryptos = getTopAssets("volumeUsd24Hr", 3, false);

  const cryptoTrendCards = [
    { title: "🔥 Most Wanted", assets: winningCryptos, value: "changePercent24Hr" },
    { title: "💰 Highest Volume", assets: highVolumeCryptos, value: "volumeUsd24Hr", isColored: false },
    { title: "⚡Biggest Drop", assets: biggestDropCryptos, value: "changePercent24Hr" },
  ].map((config, index) => <CryptoTrendCard key={index} {...config} />);

  const mobileCards = (
    <Flex justifyContent="center" height="210px">
      <Flex justifyContent="center" height="210px">
      <Box width="100%" maxWidth="400px" mx={4}>
        <CardSlider hasAutoSlide="true" cards={[<FearGreedIndexCard bitcoinData={bitcoinData} btcDominance={btcDominance} ethDominance={ethDominance} totalVolume={totalVolume} marketDirection={marketDirection} totalMarketCap={totalMarketCap} />, <WhaleWatchCard />, ...cryptoTrendCards]} />
      </Box>
    </Flex>
    </Flex>
  );

  const desktopCards = (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8} my={2} alignItems="center">
      <CardSlider cards={cryptoTrendCards} hasAutoSlide="true" hasPoints="true" slideInterval={6000} />
      <FearGreedIndexCard {...{ bitcoinData, btcDominance, ethDominance, totalVolume, marketDirection, totalMarketCap }} />
      <WhaleWatchCard />
    </Grid>
  );

  return (
    <>
      <Box mx="auto" maxWidth="1200px">
        <MarketTeaser assets={assets} mb={4} />
        <Box my={2} minHeight="210px">
          <Show below='md'>
            {mobileCards}
          </Show>
          <Hide below='md'>
            {desktopCards}
          </Hide>
        </Box>
        <Suspense fallback={<div>Loading...</div>}>
          <CryptoTable assets={assets}  />
        </Suspense>
      </Box>
      <TradingTips />
    </>
  );
};

export default Index;
