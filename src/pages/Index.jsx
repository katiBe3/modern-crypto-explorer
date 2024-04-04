import React from "react";
import MarketTeaser from "../components/market/MarketTeaser";
import FearGreedIndexCard from "../components/market/cards/FearGreedIndexCard";
import WhaleWatchCard from "../components/market/cards/WhaleWatchCard";
import CryptoTable from "../components/market/table/CryptoTable";
import TradingTips from "../components/common/TradingTips";
import { Grid, Box, Flex, Show, Hide } from "@chakra-ui/react";
import CardSlider from "../components/layout/CardSlider";
import CryptoTrendCard from "../components/market/cards/CryptoTrendCard";
import NewsSection from "../components/news/NewsSection";
import useAssetStore from "../stores/useAssetStore";

const Index = ({  }) => {
  const assets = useAssetStore(state => state.assets);

  const getTopAssets = (property, count, isAscending = false) =>
    assets
      .slice()
      .sort((a, b) => (isAscending ? a[property] - b[property] : b[property] - a[property]))
      .slice(0, count);

  const winningCryptos = React.useMemo(() => getTopAssets("changePercent24Hr", 3, false), [assets]);
  const biggestDropCryptos = React.useMemo(() => getTopAssets("changePercent24Hr", 3, true), [assets]);
  const highVolumeCryptos = React.useMemo(() => getTopAssets("volumeUsd24Hr", 3, false), [assets]);

  const cryptoTrendCards = React.useMemo(
    () =>
      [
        { title: "🔥 Most Wanted", assets: winningCryptos, value: "changePercent24Hr" },
        { title: "💰 Highest Volume", assets: highVolumeCryptos, value: "volumeUsd24Hr", isColored: false },
        { title: "⚡Biggest Drop", assets: biggestDropCryptos, value: "changePercent24Hr" },
      ].map((config, index) => <CryptoTrendCard key={index} {...config} />),
    [winningCryptos, highVolumeCryptos, biggestDropCryptos],
  );

  const mobileCards = (
    <Flex justifyContent="center" height="210px">
      <Box width="100%" maxWidth="400px" mx={4}>
        <CardSlider hasAutoSlide="true" cards={[<FearGreedIndexCard />, <WhaleWatchCard />, ...cryptoTrendCards]} />
      </Box>
    </Flex>
  );

  const desktopCards = (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8} my={2} alignItems="center">
      <CardSlider cards={cryptoTrendCards} hasAutoSlide="true" hasPoints="true" slideInterval={5000} />
      <FearGreedIndexCard />
      <WhaleWatchCard />
    </Grid>
  );

  return (
    <>
      <Box mx="auto" maxWidth="1200px">
        <MarketTeaser mb={4} />
        <Box my={2} minHeight="210px">
          <Show below="md">{mobileCards}</Show>
          <Hide below="md">{desktopCards}</Hide>
        </Box>
        <CryptoTable />
        <NewsSection />
      </Box>
        <TradingTips />
   </>
  );
};

export default Index;
