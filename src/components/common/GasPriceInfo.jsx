import React, { useState, useEffect, useCallback } from "react";
import { Flex, Text, Icon, Tooltip, Box } from "@chakra-ui/react";
import { MdLocalGasStation } from "react-icons/md";

const GasPriceInfo = ({ showTooltip = false, refreshInterval = 60000 }) => {
  const [standardGasPrice, setStandardGasPrice] = useState(null);
  const [fastGasPrice, setFastGasPrice] = useState(null);

  const fetchGasPrices = useCallback(async () => {
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
  }, []);

  const updateGasPrices = useCallback(async () => {
    const gasPrices = await fetchGasPrices();
    if (gasPrices !== null && gasPrices !== undefined) {
      if (gasPrices.ProposeGasPrice !== undefined) {
        setStandardGasPrice(gasPrices.ProposeGasPrice);
      }
      if (gasPrices.FastGasPrice !== undefined) {
        setFastGasPrice(gasPrices.FastGasPrice);
      }
    }
  }, [fetchGasPrices]);

  useEffect(() => {
    // Initial fetch
    updateGasPrices();

    // Set interval for fetching gas prices
    const intervalId = setInterval(updateGasPrices, refreshInterval);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [refreshInterval, updateGasPrices]);

  const gasInfo = (
    <Flex alignItems="center" cursor="pointer" mr={4}>
      <Icon as={MdLocalGasStation} color="gray.600" mr={2} />
      <Text mr={2}>ETH Gas: </Text>
      <Text fontWeight="bold" as="span">
        {standardGasPrice !== null ? `${standardGasPrice} Gwei` : "Loading..."}
      </Text>
    </Flex>
  );

  return (
    <>
      {showTooltip ? (
        <Tooltip
          label={`Standard: ${standardGasPrice !== null ? standardGasPrice : "Loading..."} Gwei | Fast: ${fastGasPrice !== null ? fastGasPrice : "Loading..."} Gwei`}
          aria-label="Gas Price Tooltip"
        >
          {gasInfo}
        </Tooltip>
      ) : (
        {gasInfo}
      )}
    </>
  );
};

export default GasPriceInfo;
