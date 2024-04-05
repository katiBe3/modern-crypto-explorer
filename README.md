# modern-crypto-explorer

This is a crypto tracking starter app! 😊
It picks up data from free and open APIs to track the top 100 cryptos. 

<img width="1768" alt="Video" src="https://github.com/katiBe3/modern-crypto-explorer/blob/main/src/assets/Video.gif?raw=true">

## Features
* Allows user to explore and filter the top 100 cryptos.
* Fetches current market data every 5 seconds.
* The favorite page shows matching news based on the users favorite cryptos.❤️
* Has it's own fear & greed index (based on historical & current bitcoin data).
* Shows BTC & ETH dominance, 24h volume and current ETH gas prices.
* Has a crypto name & symbol search integrated.
* Whale watch feature is constantly looking for high buys on the blockchain.
* Crypto detail page shows [tradingview](https://github.com/tradingview/lightweight-charts) charts and links to top 3 trading websites (by volume).
* Uses Skeletons on load for better user experience.
* Leverages [Zustand](https://github.com/pmndrs/zustand) for easy state management across the application.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Setup

```sh
git clone https://github.com/katiBe3/modern-crypto-explorer.git
cd modern-crypto-explorer
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Tech stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Chakra UI](https://chakra-ui.com/)

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
