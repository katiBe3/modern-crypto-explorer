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

      // Update the state only if the transaction is over 490 million for whales, or below 500 million for small fish
      if (usdAmount > 490000000) {
        set({
          highestTransaction: { ...highestTx, usdAmount },
          error: null,
          isLoading: false,
          message: "BTC whales are making waves! 🌊 Here's the latest transaction:"
        });
      } else if (usdAmount > 0) {
        set({
          highestTransaction: { ...highestTx, usdAmount },
          error: null,
          isLoading: false,
          message: "There are small fish in the sea!🐟 Keep watching for the big ones.",
        });
      } else {
        set({
          highestTransaction: null, // No transaction found
          error: null,
          isLoading: false,
          message: "No recent transactions found. Keep an eye out for whale activity!👀",
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
