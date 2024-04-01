import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Flex, Text, Icon, Tooltip, Box } from "@chakra-ui/react";
import { MdLocalGasStation } from "react-icons/md";

const GasPriceInfo = ({ showTooltip = false, refreshInterval = 60000 }) => {
  const [standardGasPrice, setStandardGasPrice] = useState(null);
  const [fastGasPrice, setFastGasPrice] = useState(null);
  const [lastFetched, setLastFetched] = useState(0);

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

  const memoizedGasPrices = useMemo(() => ({ standard: standardGasPrice, fast: fastGasPrice }), [standardGasPrice, fastGasPrice]);

  useEffect(() => {
    const shouldFetchGasPrices = !memoizedGasPrices.standard || !memoizedGasPrices.fast || Date.now() - lastFetched > refreshInterval;

    if (shouldFetchGasPrices) {
      updateGasPrices();
      setLastFetched(Date.now());
    }

    const intervalId = setInterval(() => {
      if (Date.now() - lastFetched > refreshInterval) {
        updateGasPrices();
        setLastFetched(Date.now());
      }
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [refreshInterval, updateGasPrices, lastFetched, memoizedGasPrices]);

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
        <Tooltip label={`Standard: ${standardGasPrice !== null ? standardGasPrice : "Loading..."} Gwei | Fast: ${fastGasPrice !== null ? fastGasPrice : "Loading..."} Gwei`} aria-label="Gas Price Tooltip">
          {gasInfo}
        </Tooltip>
      ) : (
        { gasInfo }
      )}
    </>
  );
};

export default GasPriceInfo;
