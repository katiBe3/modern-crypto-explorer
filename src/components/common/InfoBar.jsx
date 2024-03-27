import { Box, Text, useColorModeValue } from "@chakra-ui/react";

const InfoBar = ({ assets }) => {
  const calculateDominance = (symbol) => {
    const totalMarketCap = assets.reduce((sum, asset) => sum + parseFloat(asset.marketCapUsd), 0);
    const assetData = assets.find((asset) => asset.symbol === symbol);
    const dominance = (parseFloat(assetData.marketCapUsd) / totalMarketCap) * 100;
    return dominance.toFixed(2);
  };

  return (
    <Box bg={useColorModeValue("gray.50", "gray.700")} py={2} px={4} borderBottom="1px" borderColor="gray.200">
      <Text color={useColorModeValue("black", "white")} textAlign="left" fontSize="sm">
        Dominance: <strong>BTC {calculateDominance("BTC")}%</strong> <strong>ETH {calculateDominance("ETH")}%</strong>
      </Text>
    </Box>
  );
};

export default InfoBar;
