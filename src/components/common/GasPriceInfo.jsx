import React, { useEffect, useRef } from "react";
import { Flex, Text, Icon, Tooltip } from "@chakra-ui/react";
import { MdLocalGasStation } from "react-icons/md";
import useGasPriceStore from "../../stores/useGasPriceStore"; 

const GasPriceInfo = ({ showTooltip = false, refreshInterval = 60000 }) => {
  const { standardGasPrice, fastGasPrice, fetchGasPrices, lastFetched } = useGasPriceStore();
  const fetchRef = useRef(fetchGasPrices); // Use useRef to get a stable reference to fetchGasPrices

  // Update the ref when fetchGasPrices changes
  useEffect(() => {
    fetchRef.current = fetchGasPrices;
  }, [fetchGasPrices]);

  // Effect to fetch gas prices periodically
  useEffect(() => {
    const handleFetch = () => {
      // Fetch if prices are not available or if the data is older than refreshInterval
      if (!standardGasPrice || !fastGasPrice || Date.now() - lastFetched > refreshInterval) {
        fetchRef.current(); 
      }
    };

    handleFetch(); // Fetch on component mount and when dependencies change
    const intervalId = setInterval(handleFetch, refreshInterval); // Set up a periodic fetch
    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [standardGasPrice, fastGasPrice, lastFetched, refreshInterval]);

  // Component displaying gas prices or loading state
  const gasInfo = (
    <Flex alignItems="center" cursor="pointer" mr={4}>
      <Icon as={MdLocalGasStation} color="gray.600" mr={2} />
      <Text mr={2}>ETH Gas:</Text>
      <Text fontWeight="bold" as="span">
        {standardGasPrice ? `${standardGasPrice} Gwei` : "Loading..."}
      </Text>
    </Flex>
  );

  // Only show tooltip if both showTooltip and gas prices are available
  const shouldShowTooltip = showTooltip && standardGasPrice && fastGasPrice;

  return (
    <>
      {shouldShowTooltip ? (
        <Tooltip label={`Standard: ${standardGasPrice} Gwei | Fast: ${fastGasPrice} Gwei`} aria-label="Gas Price Tooltip">
          {gasInfo}
        </Tooltip>
      ) : (
        gasInfo
      )}
    </>
  );
};

export default GasPriceInfo; 
