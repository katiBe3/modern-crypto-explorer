import { Box, Icon } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const InfoBar = ({ assets, previousDayTotalMarketCap }) => {
  if (!assets || !assets.length) {
    return <Box>Loading data...</Box>;
  }

  const calculateDominance = (assetSymbol) => {
    const totalMarketCap = assets.reduce((acc, asset) => acc + parseFloat(asset.marketCapUsd || 0), 0);
    const asset = assets.find((a) => a.symbol === assetSymbol);
    return asset ? ((parseFloat(asset.marketCapUsd) / totalMarketCap) * 100).toFixed(2) : "0";
  };

  const calculateTotalVolume = () => {
    const totalVolume = assets.reduce((acc, asset) => acc + parseFloat(asset.volumeUsd24Hr || 0), 0);
    return (totalVolume / 1e9).toFixed(2); // Convert to billions
  };

  const calculateTotalMarketCap = () => {
    return assets.reduce((acc, asset) => acc + parseFloat(asset.marketCapUsd || 0), 0) / 1e12; // Convert to trillions
  };

  const totalMarketCap = calculateTotalMarketCap();
  const marketDirection = totalMarketCap > previousDayTotalMarketCap ? "up" : "down";

  const btcDominance = calculateDominance("BTC");
  const ethDominance = calculateDominance("ETH");
  const totalVolume = calculateTotalVolume();

  return (
    <Box bg="#100D30" py={2} px={4} overflowX="auto" whiteSpace="nowrap">
      <Box color="white" textAlign="left" fontSize="sm" display="flex" alignItems="center">
        <Box mr={4}>
          <Box as="span" fontWeight="bold">
            BTC
          </Box>{" "}
          {btcDominance}%
        </Box>
        <Box mr={4}>
          <Box as="span" fontWeight="bold">
            ETH
          </Box>{" "}
          {ethDominance}%
        </Box>
        <Box mr={4}>
          24h Vol:{" "}
          <Box as="span" fontWeight="bold">
            ${totalVolume} Billion
          </Box>
        </Box>
        <Box mr={4}>
          Total Market Cap:{" "}
          <Box as="span" fontWeight="bold" textShadow="0 0 10px rgba(255, 255, 255, 0.75)">
            ${totalMarketCap.toFixed(2)} Trillion
          </Box>
          {marketDirection === "up" ? <Icon as={FaArrowUp} color="green.500" ml={2} /> : <Icon as={FaArrowDown} color="red.500" ml={2} />}
        </Box>
      </Box>
    </Box>
  );
};

export default InfoBar;
