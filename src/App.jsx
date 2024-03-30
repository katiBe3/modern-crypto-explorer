import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import Learn from "./pages/Learn.jsx";
import Favorites from "./pages/Favorites.jsx";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  const [assets, setAssets] = useState([]);
  const [bitcoinData, setBitcoinData] = useState([]);
  const [historicalDataLastFetched, setHistoricalDataLastFetched] = useState(null);
  const [assetPriceData, setAssetPriceData] = useState({});

  const fetchAssetsRef = useRef();
  const historicalDataFetchRef = useRef();

  const fetchAssets = useCallback(async () => {
    const response = await fetch("https://api.coincap.io/v2/assets");
    const data = await response.json();
    setAssets(data.data);
  }, []);

  const fetchHistoricalData = useCallback(async () => {
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

    if (historicalDataLastFetched && historicalDataLastFetched > twentyFourHoursAgo) {
      return;
    }

    const endDate = new Date().getTime();
    const startDate = endDate - 60 * 24 * 60 * 60 * 1000;
    const response = await fetch(`https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=${startDate}&end=${endDate}`);
    const data = await response.json();
    setBitcoinData(data.data);
    setHistoricalDataLastFetched(Date.now());
  }, [historicalDataLastFetched]);

  const fetchAssetPriceData = useCallback(async (assetId) => {
    const endDate = new Date().getTime();
    const startDate = endDate - 30 * 60 * 1000;
    const response = await fetch(`https://api.coincap.io/v2/assets/${assetId}/history?interval=m1&start=${startDate}&end=${endDate}`);
    const data = await response.json();
    setAssetPriceData((prevData) => ({
      ...prevData,
      [assetId]: data.data,
    }));
  }, []);

  useEffect(() => {
    fetchAssetsRef.current = fetchAssets;
    historicalDataFetchRef.current = fetchHistoricalData;
  }, [fetchAssets, fetchHistoricalData]);

  useEffect(() => {
    fetchAssets();
    fetchHistoricalData();
    const assetsInterval = setInterval(fetchAssets, 10000);

    const priceDataInterval = setInterval(() => {
      assets.forEach((asset) => {
        fetchAssetPriceData(asset.id);
      });
    }, 60000);

    return () => {
      clearInterval(assetsInterval);
      clearInterval(priceDataInterval);
    };
  }, [fetchAssets, fetchHistoricalData, assets, fetchAssetPriceData]);

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

  const btcDominance = useMemo(() => calculateDominance("BTC"), [assets]);
  const ethDominance = useMemo(() => calculateDominance("ETH"), [assets]);
  const totalVolume = useMemo(() => calculateTotalVolume(), [assets]);
  const marketDirection = useMemo(() => calculateMarketDirection("BTC"), [assets]);
  const totalMarketCap = useMemo(() => calculateTotalMarketCap(), [assets]);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header marketData={{ btcDominance, ethDominance, totalVolume, marketDirection, totalMarketCap }} />
      <Router>
        <Routes>
          <Route exact path="/" element={<Index assets={assets} marketData={{ bitcoinData, btcDominance, ethDominance, totalVolume, marketDirection, totalMarketCap }} />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/favorites" element={<Favorites assets={assets} />} />
        </Routes>
      </Router>
      <Footer />
    </Box>
  );
}

export default App;
