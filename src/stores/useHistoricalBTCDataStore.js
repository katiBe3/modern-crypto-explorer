import { create } from 'zustand';

const useHistoricalBTCDataStore = create((set, get) => ({
  bitcoinData: [],
  historicalDataLastFetched: null,

  fetchHistoricalBtcData: async () => {
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

    if (!get().historicalDataLastFetched || get().historicalDataLastFetched < twentyFourHoursAgo) {
      const endDate = new Date().getTime();
      const startDate = endDate - 60 * 24 * 60 * 60 * 1000;
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=${startDate}&end=${endDate}`);
        const data = await response.json();
        set({
          bitcoinData: data.data,
          historicalDataLastFetched: Date.now(),
        });
      } catch (error) {
        console.error('Error fetching historical BTC data:', error);
      }
    }
  },
}));

export default useHistoricalBTCDataStore;
