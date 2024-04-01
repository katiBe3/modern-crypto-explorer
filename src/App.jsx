import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";

import Favorites from "./pages/Favorites.jsx";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CryptoDetails from "./pages/CryptoDetails";
import NewsPage from "./pages/NewsPage";

function App() {
  const [assets, setAssets] = useState([]);
  const [bitcoinData, setBitcoinData] = useState([]);
  const [historicalDataLastFetched, setHistoricalDataLastFetched] = useState(null);

  const fetchAssets = React.useCallback(async () => {
    try {
      const response = await fetch("https://api.coincap.io/v2/assets");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const assetsWithRank = data.data.map((asset, index) => ({
        ...asset,
        rank: index + 1,
      }));
      setAssets(assetsWithRank);
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("Fetch aborted while fetching assets:", error.message);
      } else {
        console.error("Error fetching assets:", error);
      }
    }
  }, []);

  const fetchHistoricalBtcData = React.useCallback(async () => {
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

    if (!historicalDataLastFetched || historicalDataLastFetched < twentyFourHoursAgo) {
      const endDate = new Date().getTime();
      const startDate = endDate - 60 * 24 * 60 * 60 * 1000;
      const response = await fetch(`https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=${startDate}&end=${endDate}`);
      const data = await response.json();
      setBitcoinData(data.data);
      setHistoricalDataLastFetched(Date.now());
    }
  }, [historicalDataLastFetched]);

  useEffect(() => {
    fetchAssets();
    fetchHistoricalBtcData();
    const assetsInterval = setInterval(fetchAssets, 5000);
    return () => {
      clearInterval(assetsInterval);
    };
  }, [fetchAssets, fetchHistoricalBtcData]);

  const calculateDominance = (assetSymbol) => {
    const totalMarketCap = assets.reduce((acc, asset) => acc + parseFloat(asset.marketCapUsd || 0), 0);
    const asset = assets.find((a) => a.symbol === assetSymbol);
    return asset ? ((parseFloat(asset.marketCapUsd) / totalMarketCap) * 100).toFixed(2) : "0";
  };

  const calculateTotalVolume = () => {
    const totalVolume = assets.reduce((acc, asset) => acc + parseFloat(asset.volumeUsd24Hr || 0), 0);
    return (totalVolume / 1e9).toFixed(2);
  };

  const calculateTotalMarketCap = () => {
    return assets.reduce((acc, asset) => acc + parseFloat(asset.marketCapUsd || 0), 0) / 1e12;
  };

  const calculateMarketDirection = (assetSymbol) => {
    const asset = assets.find((a) => a.symbol === assetSymbol);
    if (asset && !isNaN(parseFloat(asset.changePercent24Hr))) {
      return parseFloat(asset.changePercent24Hr) > 0 ? "up" : "down";
    }
    return "neutral";
  };

  const marketData = React.useMemo(
    () => ({
      btcDominance: calculateDominance("BTC"),
      ethDominance: calculateDominance("ETH"),
      totalVolume: calculateTotalVolume(),
      marketDirection: calculateMarketDirection("BTC"),
      totalMarketCap: calculateTotalMarketCap(),
    }),
    [assets],
  );

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header marketData={marketData} assets={assets} />
      <Router>
        <Routes>
          <Route exact path="/" element={<Index assets={assets} marketData={{ bitcoinData, ...marketData }} />} />
          <Route path="/about" element={<About />} />

          <Route path="/favorites" element={<Favorites assets={assets} />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/crypto/:id" element={<CryptoDetails assets={assets} />} />
        </Routes>
      </Router>
      <Footer />
    </Box>
  );
}

export default App;
