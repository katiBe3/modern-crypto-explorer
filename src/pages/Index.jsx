import React, { useState, useEffect } from "react";

import CryptoTable from "../components/market/CryptoTable";

const Index = () => {
  const [assetsData, setAssetsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.coincap.io/v2/assets");
        const data = await response.json();
        setAssetsData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return <CryptoTable assetsData={assetsData} loading={loading} />;
};

export default Index;
