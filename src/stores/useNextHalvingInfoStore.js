import { create } from 'zustand';

const useNextHalvingInfoStore = create((set) => ({
  daysUntilHalving: localStorage.getItem('daysUntilHalving') ? parseInt(localStorage.getItem('daysUntilHalving'), 10) : null,
  remainingBlocks: localStorage.getItem('remainingBlocks') ? parseInt(localStorage.getItem('remainingBlocks'), 10) : null,
  blockTimeInSeconds: localStorage.getItem('blockTimeInSeconds') ? parseInt(localStorage.getItem('blockTimeInSeconds'), 10) : null,
  fetchNextHalvingInfo: async () => {
    try {
      const blockCountResponse = await fetch("https://blockchain.info/q/getblockcount");
      if (!blockCountResponse.ok) {
        throw new Error("Failed to fetch block count");
      }
      const blockCount = await blockCountResponse.json();
      const blocksUntilHalving = 210000 - (blockCount % 210000);
      const daysUntilHalving = Math.ceil(blocksUntilHalving / (6 * 24)); // 6 blocks per hour, 24 hours per day

      const blockTimeResponse = await fetch("https://blockchain.info/q/interval");
      if (!blockTimeResponse.ok) {
        throw new Error("Failed to fetch block time");
      }
      const blockTimeInSeconds = await blockTimeResponse.json();

      set({
        remainingBlocks: blocksUntilHalving,
        daysUntilHalving: daysUntilHalving,
        blockTimeInSeconds: blockTimeInSeconds,
      });

      // Save to local storage
      localStorage.setItem('remainingBlocks', blocksUntilHalving);
      localStorage.setItem('daysUntilHalving', daysUntilHalving);
      localStorage.setItem('blockTimeInSeconds', blockTimeInSeconds);
    } catch (error) {
      console.error("Error fetching next halving info:", error);
      set({
        remainingBlocks: null,
        daysUntilHalving: null,
        blockTimeInSeconds: null,
      });
    }
  },
}));

export default useNextHalvingInfoStore;
