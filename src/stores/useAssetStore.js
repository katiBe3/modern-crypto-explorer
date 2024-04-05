import { create } from 'zustand';

const useAssetStore = create((set) => ({
  totalMarketCap: null,
  overallPercentChange: null,
  assets: [],
  btcDominance: null,
  ethDominance: null,
  totalVolume: null,
  marketDirection: "neutral",
  
  setAssets: (assets) => {
    const marketData = calculateMarketData(assets);
    set(() => ({
      ...marketData,
      assets,
    }));
  },

  fetchAssets: async () => {
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

      set(() => ({
        ...calculateMarketData(assetsWithRank),
        assets: assetsWithRank,
      }));
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  },
}));

function calculateMarketData(assets) {
  let totalMarketCap = assets.reduce((acc, asset) => acc + parseFloat(asset.marketCapUsd || 0), 0);
  let btcDominance = 0;
  let ethDominance = 0;
  let totalVolume = assets.reduce((acc, asset) => acc + parseFloat(asset.volumeUsd24Hr || 0), 0);

  const btcAsset = assets.find(asset => asset.symbol === 'BTC');
  const ethAsset = assets.find(asset => asset.symbol === 'ETH');
  if (btcAsset) btcDominance = (parseFloat(btcAsset.marketCapUsd) / totalMarketCap * 100).toFixed(2);
  if (ethAsset) ethDominance = (parseFloat(ethAsset.marketCapUsd) / totalMarketCap * 100).toFixed(2);

  let overallPercentChange = calculateOverallPercentChange(assets, totalMarketCap);

  return {
    totalMarketCap: (totalMarketCap / 1e12).toFixed(2),
    btcDominance,
    ethDominance,
    totalVolume: (totalVolume / 1e9).toFixed(2),
    overallPercentChange,
    marketDirection: overallPercentChange > 0 ? "up" : "down",
  };
}

function calculateOverallPercentChange(assets, totalMarketCap) {
  let weightedPercentChange = assets.reduce((acc, asset) => {
    const marketCap = parseFloat(asset.marketCapUsd);
    const percentChange = parseFloat(asset.changePercent24Hr);
    return acc + (marketCap / totalMarketCap * percentChange);
  }, 0);

  return weightedPercentChange.toFixed(2);
}

export default useAssetStore;
