import React, { useEffect, useRef } from "react";
import { Flex, Text, Icon, Tooltip } from "@chakra-ui/react";
import { MdLocalGasStation } from "react-icons/md";
import useGasPriceStore from "../../stores/useGasPriceStore"; 

const GasPriceInfo = ({ showTooltip = false, refreshInterval = 60000 }) => {
  const { standardGasPrice, fastGasPrice, fetchGasPrices, lastFetched } = useGasPriceStore();
  const fetchRef = useRef(fetchGasPrices); // Use useRef to get a stable reference

  // Update the ref if fetchGasPrices changes
  useEffect(() => {
    fetchRef.current = fetchGasPrices;
  }, [fetchGasPrices]);

  useEffect(() => {
    // Define a function to handle fetching and checking
    const handleFetch = () => {
      if (!standardGasPrice || !fastGasPrice || Date.now() - lastFetched > refreshInterval) {
        fetchRef.current(); // Use the current reference to fetch
      }
    };

    handleFetch(); // Call on mount and when dependencies change

    const intervalId = setInterval(handleFetch, refreshInterval);
    return () => clearInterval(intervalId);
  }, [standardGasPrice, fastGasPrice, lastFetched, refreshInterval]);

  const gasInfo = (
    <Flex alignItems="center" cursor="pointer" mr={4}>
      <Icon as={MdLocalGasStation} color="gray.600" mr={2} />
      <Text mr={2}>ETH Gas:</Text>
      <Text fontWeight="bold" as="span">
        {standardGasPrice ? `${standardGasPrice} Gwei` : "Loading..."}
      </Text>
    </Flex>
  );

  return (
    <>
      {showTooltip ? (
        <Tooltip label={`Standard: ${standardGasPrice || "Loading..."} Gwei | Fast: ${fastGasPrice || "Loading..."} Gwei`} aria-label="Gas Price Tooltip">
          {gasInfo}
        </Tooltip>
      ) : (
        gasInfo
      )}
    </>
  );
};

export default GasPriceInfo;
