import React from "react";
import MarketTeaser from "../components/market/MarketTeaser";
import FearGreedIndex from "../components/market/FearGreedIndex";
import CryptoTable from "../components/market/CryptoTable";
import TradingTips from "../components/common/TradingTips";

const Index = ({ assets, marketData }) => {
  const { bitcoinData, btcDominance, ethDominance, totalVolume, marketDirection, totalMarketCap } = marketData;
  return (
    <>
      <MarketTeaser assets={assets} mb={4} />
      <FearGreedIndex bitcoinData={bitcoinData} btcDominance={btcDominance} ethDominance={ethDominance} totalVolume={totalVolume} marketDirection={marketDirection} totalMarketCap={totalMarketCap} mt={4} />
      <CryptoTable assets={assets} />
      <TradingTips />
    </>
  );
};

export default Index;
