import { createContext, useState, useEffect, useRef, useCallback} from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [bitcoinData, setBitcoinData] = useState([]);
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

  // Load favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const localData = localStorage.getItem("favorites");
      return localData ? JSON.parse(localData) : {};
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      return {};
    }
  });

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);

  return <DataContext.Provider value={{ assets, setAssets, bitcoinData, setBitcoinData, favorites, setFavorites }}>{children}</DataContext.Provider>;
};
