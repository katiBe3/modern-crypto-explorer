import { create } from 'zustand';

// Utility function to fetch and filter news by unique sources
const fetchAndFilterNews = async (url, maxArticles = 3) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.Data.reduce((acc, article) => {
      if (!acc.find(item => item.source === article.source) && acc.length < maxArticles) {
        acc.push(article);
      }
      return acc;
    }, []);
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

const useNewsStore = create((set) => ({
  generalNewsData: [],
  cryptoNewsData: {},
  multiCryptoNewsData: [],
  
  fetchGeneralNews: async () => {
    const uniqueSourceNews = await fetchAndFilterNews("https://min-api.cryptocompare.com/data/v2/news/?lang=EN", 18);
    set({ generalNewsData: uniqueSourceNews });
  },

  fetchCryptoNews: async (cryptoSymbol) => {
    const uniqueSourceNews = await fetchAndFilterNews(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=${cryptoSymbol}`, 3);
    set((state) => ({
      cryptoNewsData: {
        ...state.cryptoNewsData,
        [cryptoSymbol]: uniqueSourceNews,
      },
    }));
  },

  fetchMultiCryptoNews: async (cryptos) => {
    let url = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";
    if (cryptos && cryptos.length > 0) {
      const cryptoSymbols = Array.isArray(cryptos) ? cryptos.join(",") : cryptos;
      url += `&categories=${cryptoSymbols}`;
    }
    const selectedArticles = await fetchAndFilterNews(url, 3);
    set({ multiCryptoNewsData: selectedArticles });
  },
}));

export default useNewsStore;
