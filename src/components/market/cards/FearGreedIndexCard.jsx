import React, { useState, useEffect } from "react";
import { Text, useColorModeValue, Skeleton } from "@chakra-ui/react";
import Card from "../../layout/Card";
import useHistoricalBTCDataStore from "../../../stores/useHistoricalBTCDataStore"; 
import useAssetStore from "../../../stores/useAssetStore";

const FearGreedIndex = () => {
  const [fearGreedIndex, setFearGreedIndex] = useState(null);
  const [indexSentiment, setIndexSentiment] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Access historical and current from the store
  const historicalBitcoinData = useHistoricalBTCDataStore((state) => state.bitcoinData);
  const fetchHistoricalBTCData = useHistoricalBTCDataStore((state) => state.fetchHistoricalBtcData);
  const assets = useAssetStore((state) => state.assets);
  const fetchAssets = useAssetStore((state) => state.fetchAssets);
  const currentBitcoinData = assets.find(asset => asset.symbol === "BTC");

  useEffect(() => {
    fetchHistoricalBTCData();
    fetchAssets();
  }, [fetchHistoricalBTCData, fetchAssets]);

  useEffect(() => {
    if (!Array.isArray(historicalBitcoinData) || !currentBitcoinData) {
      setIsLoading(true);
      return;
    }

    const calculateFearGreedIndex = () => {
      setLastUpdated(Date.now());
    
      let priceChanges = historicalBitcoinData.map((data, i, arr) => {
        if (i === 0) return 0;
        const previousPrice = parseFloat(arr[i - 1].priceUsd);
        const currentPrice = parseFloat(data.priceUsd);
        return ((currentPrice - previousPrice) / previousPrice) * 100;
      }).filter(Boolean);
      // Incorporate the latest 24hr change percentage into the calculation    
      const currentChangePercent = parseFloat(currentBitcoinData.changePercent24Hr);
      if (!isNaN(currentChangePercent)) {
        priceChanges.push(currentChangePercent);
      }

      const avgPriceChange = priceChanges.reduce((sum, change) => sum + change, 0) / priceChanges.length;
      // Adjust these values to get a more balanced index
      const scaledIndex = (avgPriceChange + 5.2) * 12.3;
      const index = Math.round(Math.min(100, Math.max(0, scaledIndex)));
    
      let sentiment;
      if (index >= 80) {
        sentiment = "Extreme Greed 🤑";
      } else if (index >= 60) {
        sentiment = "Greed 😀";
      } else if (index >= 40) {
        sentiment = "Neutral 😐";
      } else if (index >= 20) {
        sentiment = "Fear 😰";
      } else {
        sentiment = "Extreme Fear 😱";
      }

      setFearGreedIndex(index);
      setIndexSentiment(sentiment);
      setIsLoading(false);
    };

    calculateFearGreedIndex();
  }, [historicalBitcoinData, currentBitcoinData]);

  const formatDate = (timestamp) => {
    const options = { month: "long", day: "numeric" };
    const formattedDate = new Date(timestamp).toLocaleDateString("en-US", options);
    const day = formattedDate.split(" ")[1];
    const daySuffix = getDaySuffix(day);
    return formattedDate.replace(day, day + daySuffix);
  };

  const getDaySuffix = (day) => {
    switch (day % 10) {
      case 1: return day === 11 ? "th" : "st";
      case 2: return day === 12 ? "th" : "nd";
      case 3: return day === 13 ? "th" : "rd";
      default: return "th";
    }
  };

  const indexColor = useColorModeValue(indexSentiment?.includes("Greed") ? "green.500" : "red.500", indexSentiment?.includes("Greed") ? "green.200" : "red.200");

  return (
    <Card title="Fear & Greed Index">
      <Skeleton isLoaded={!isLoading} height="60px">
        <Text fontSize="6xl" lineHeight="100%" fontWeight="black" color={indexColor}>
          {fearGreedIndex}
        </Text>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} height="24px">
        <Text fontWeight="bold" textAlign="center">
          {indexSentiment}
        </Text>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} height="20px" mt={2}>
        <Text fontSize="sm" fontWeight="normal" textAlign="center" color="gray.500">
          Last updated: {formatDate(lastUpdated)}
        </Text>
      </Skeleton>
    </Card>
  );
};

export default React.memo(FearGreedIndex);
