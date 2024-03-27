import { Box, Text } from "@chakra-ui/react";

const InfoBar = ({ assets }) => {
  const calculateDominance = (symbol) => {
    const totalMarketCap = assets.reduce((sum, asset) => sum + parseFloat(asset.marketCapUsd), 0);
    const assetMarketCap = assets.find((asset) => asset.symbol === symbol)?.marketCapUsd;
    return assetMarketCap ? ((parseFloat(assetMarketCap) / totalMarketCap) * 100).toFixed(2) : "0.00";
  };

  const btcDominance = calculateDominance("BTC");
  const ethDominance = calculateDominance("ETH");

  return (
    <Box bg="gray.700" py={2} px={4}>
      <Text color="white" textAlign="left" fontSize="sm">
        Dominance:{" "}
        <Text as="span" fontWeight="bold">
          BTC {btcDominance}%
        </Text>{" "}
        <Text as="span" fontWeight="bold">
          ETH {ethDominance}%
        </Text>
      </Text>
    </Box>
  );
};

export default InfoBar;
