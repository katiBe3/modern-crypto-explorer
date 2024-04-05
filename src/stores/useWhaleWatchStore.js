import { create } from 'zustand';

const useWhaleWatchStore = create((set) => ({
  highestTransaction: null,
  error: null,
  isLoading: true,
  fetchWhaleActivity: async () => {
    try {
      const transactionsResponse = await fetch("https://blockstream.info/api/mempool/recent");
      if (!transactionsResponse.ok) {
        throw new Error("Failed to fetch recent transactions");
      }
      const transactions = await transactionsResponse.json();
      const highestTx = transactions.reduce((prev, current) => (prev.value > current.value ? prev : current));

      const priceResponse = await fetch("https://api.coincap.io/v2/assets/bitcoin");
      if (!priceResponse.ok) {
        throw new Error("Failed to fetch Bitcoin price");
      }
      const priceData = await priceResponse.json();
      const bitcoinPrice = parseFloat(priceData.data.priceUsd);

      const usdAmount = (highestTx.value / 1000000000) * bitcoinPrice;

      // Update the state only if the transaction is over $10 million
      if (usdAmount > 10000000) {
        set({
          highestTransaction: { ...highestTx, usdAmount },
          error: null,
          isLoading: false,
        });
      } else {
        set({
          highestTransaction: null, // No whale transaction found
          error: null,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching whale activity:", error.message);
      set({
        error: "Error fetching whale activity: " + error.message,
        isLoading: false,
      });
    }
  },
}));

export default useWhaleWatchStore;
