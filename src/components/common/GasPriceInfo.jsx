import React, { useState, useEffect } from "react";
import { Flex, Text, Icon, Tooltip } from "@chakra-ui/react";
import { MdLocalGasStation } from "react-icons/md";

const GasPriceInfo = ({ showTooltip = false, refreshInterval = 300000 }) => {
  const [slowGasPrice, setSlowGasPrice] = useState(null);
  const [standardGasPrice, setStandardGasPrice] = useState(null);
  const [fastGasPrice, setFastGasPrice] = useState(null);

  useEffect(() => {
    const fetchGasPrices = async () => {
      try {
        const response = await fetch("https://api.etherscan.io/api?module=gastracker&action=gasoracle");
        if (!response.ok) {
          throw new Error("Failed to fetch gas prices");
        }
        const data = await response.json();
        return data.result;
      } catch (error) {
        console.error("Error fetching gas prices:", error.message);
        return null;
      }
    };

    const updateGasPrices = () => {
      fetchGasPrices().then((gasPrices) => {
        if (gasPrices !== null) {
          setSlowGasPrice(gasPrices.SafeGasPrice);
          setStandardGasPrice(gasPrices.ProposeGasPrice);
          setFastGasPrice(gasPrices.FastGasPrice);
        }
      });
    };

    // Initial fetch
    updateGasPrices();

    // Set interval for fetching gas prices
    const intervalId = setInterval(updateGasPrices, refreshInterval);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  return (
    <>
      {showTooltip ? (
        <Tooltip
          label={`Slow: ${slowGasPrice !== null ? slowGasPrice : "Loading..."} Gwei | Medium: ${standardGasPrice !== null ? standardGasPrice : "Loading..."} Gwei | Fast: ${fastGasPrice !== null ? fastGasPrice : "Loading..."} Gwei`}
          aria-label="Gas Price Tooltip"
        >
          <Flex alignItems="center">
            <Icon as={MdLocalGasStation} color="gray.500" mr={2} />
            <Text mr={2}>Gas Prices: </Text>
            <Text fontWeight="bold" as="span" textShadow="0 0 10px rgba(255, 255, 255, 0.75)">
              {standardGasPrice !== null ? `${standardGasPrice} Gwei` : "Loading..."}
            </Text>
          </Flex>
        </Tooltip>
      ) : (
        <Flex alignItems="center">
          <Icon as={MdLocalGasStation} color="gray.500" mr={2} />
          <Text mr={2}>Gas Prices: </Text>
          <Text fontWeight="bold" as="span" textShadow="0 0 10px rgba(255, 255, 255, 0.75)">
            {standardGasPrice !== null ? `${standardGasPrice} Gwei` : "Loading..."}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default GasPriceInfo;
