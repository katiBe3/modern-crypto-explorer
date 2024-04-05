import { create } from 'zustand';

const useGasPriceStore = create((set) => ({
  standardGasPrice: null,
  fastGasPrice: null,
  lastFetched: 0,
  setStandardGasPrice: (price) => {
    set(() => ({ standardGasPrice: price }));
  },
  setFastGasPrice: (price) => {
    set(() => ({ fastGasPrice: price }));
  },
  setLastFetched: (time) => {
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
        set(() => ({
          standardGasPrice: ProposeGasPrice,
          fastGasPrice: FastGasPrice,
          lastFetched: Date.now(),
        }));
      }
    } catch (error) {
      console.error("Error fetching gas prices:", error.message);
    }
  },
}));

export default useGasPriceStore;
