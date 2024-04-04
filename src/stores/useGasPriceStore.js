import { create } from 'zustand';

const useGasPriceStore = create((set, get) => ({
  standardGasPrice: localStorage.getItem('standardGasPrice') || null,
  fastGasPrice: localStorage.getItem('fastGasPrice') || null,
  lastFetched: localStorage.getItem('lastFetchedGasTime') || 0,
  setStandardGasPrice: (price) => {
    localStorage.setItem('standardGasPrice', price);
    set(() => ({ standardGasPrice: price }));
  },
  setFastGasPrice: (price) => {
    localStorage.setItem('fastGasPrice', price);
    set(() => ({ fastGasPrice: price }));
  },
  setLastFetched: (time) => {
    localStorage.setItem('lastFetchedGasTime', time);
    set(() => ({ lastFetched: time }));
  },
  fetchGasPrices: async () => {
    try {
      const response = await fetch("https://api.etherscan.io/api?module=gastracker&action=gasoracle");
      if (!response.ok) throw new Error("Failed to fetch gas prices");
      const data = await response.json();
      const gasPrices = data.result;

      if (gasPrices) {
        const { ProposeGasPrice, FastGasPrice } = gasPrices;
        get().setStandardGasPrice(ProposeGasPrice);
        get().setFastGasPrice(FastGasPrice);
        get().setLastFetched(Date.now());
      }
    } catch (error) {
      console.error("Error fetching gas prices:", error.message);
    }
  },
}));

export default useGasPriceStore;
