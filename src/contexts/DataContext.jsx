import React, { createContext, useState, useCallback, useEffect, useRef } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({});
  const [assets, setAssets] = useState([]);
  const [bitcoinData, setBitcoinData] = useState(null);
  const [historicalDataLastFetched, setHistoricalDataLastFetched] = useState(null);

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

  useEffect(() => {
    fetchAssetsRef.current = fetchAssets;
    historicalDataFetchRef.current = fetchHistoricalData;
  }, [fetchAssets, fetchHistoricalData]);

  useEffect(() => {
    fetchAssets();
    fetchHistoricalData();
    const assetsInterval = setInterval(fetchAssets, 10000);

    return () => clearInterval(assetsInterval);
  }, [fetchAssets, fetchHistoricalData]);

  return <DataContext.Provider value={{ favorites, setFavorites, assets, bitcoinData }}>{children}</DataContext.Provider>;
};
