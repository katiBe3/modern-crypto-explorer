import { create } from 'zustand';
import { exchangeUrls } from '../data/ExchangeUrls'; // Adjust the import path as necessary

const useExchangeStore = create((set, get) => ({
  exchanges: [],
  fetchExchanges: async (cryptoId) => {
    try {
      const response = await fetch(`https://api.coincap.io/v2/assets/${cryptoId}/markets`);
      const data = await response.json();
      const filteredExchanges = data.data.filter(exchange => exchange.exchangeId.toLowerCase() in exchangeUrls).slice(0, 3);
      set({ exchanges: filteredExchanges });
    } catch (error) {
      console.error("Error fetching exchanges:", error);
    }
  },
}));

export default useExchangeStore;