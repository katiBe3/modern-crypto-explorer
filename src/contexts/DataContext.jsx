import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [bitcoinData, setBitcoinData] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    try {
      const localData = localStorage.getItem("favorites");
      return localData ? JSON.parse(localData) : {};
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);

  return <DataContext.Provider value={{ assets, setAssets, bitcoinData, setBitcoinData, favorites, setFavorites }}>{children}</DataContext.Provider>;
};
