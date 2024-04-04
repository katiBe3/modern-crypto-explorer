import { create } from 'zustand';

const useNewsStore = create((set) => ({
  generalNewsData: [],
  cryptoNewsData: {},  // Stores news by crypto symbol
  multiCryptoNewsData: [],  // Stores news for multiple cryptos
  fetchGeneralNews: async () => {
    try {
      const response = await fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN");
      const data = await response.json();
      set({ generalNewsData: data.Data });
    } catch (error) {
      console.error("Error fetching general news data:", error);
    }
  },
  fetchCryptoNews: async (cryptoSymbol) => {
    try {
      const response = await fetch(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=${cryptoSymbol}`);
      const data = await response.json();
      set((state) => ({
        cryptoNewsData: {
          ...state.cryptoNewsData,
          [cryptoSymbol]: data.Data.slice(0, 3),
        },
      }));
    } catch (error) {
      console.error(`Error fetching news data for ${cryptoSymbol}:`, error);
    }
  },
  fetchMultiCryptoNews: async (cryptos) => {
    try {
      let url = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";
      if (cryptos && cryptos.length > 0) {
        const cryptoSymbols = Array.isArray(cryptos) ? cryptos.join(",") : cryptos;
        url += `&categories=${cryptoSymbols}`;
      }
      const response = await fetch(url);
      const data = await response.json();

      const selectedArticles = data.Data.reduce((acc, article) => {
        const sourceExists = acc.find((item) => item.source === article.source);
        if (!sourceExists && acc.length < 3) {
          acc.push(article);
        }
        return acc;
      }, []);

      set({ multiCryptoNewsData: selectedArticles });
    } catch (error) {
      console.error("Error fetching multi-crypto news data:", error);
    }
  },
}));

export default useNewsStore;