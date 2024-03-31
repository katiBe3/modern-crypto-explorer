import React, { useState, useEffect } from "react";
import { Flex, Text, Icon, Tooltip } from "@chakra-ui/react";
import { MdLocalGasStation } from "react-icons/md";

const GasPriceInfo = ({ showTooltip = false, refreshInterval = 60000 }) => {
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

    const updateGasPrices = async () => {
      const gasPrices = await fetchGasPrices();
      if (gasPrices) {
        setSlowGasPrice(gasPrices.SafeGasPrice || "N/A");
        setStandardGasPrice(gasPrices.ProposeGasPrice || "N/A");
        setFastGasPrice(gasPrices.FastGasPrice || "N/A");
      } else {
        setSlowGasPrice("Error");
        setStandardGasPrice("Error");
        setFastGasPrice("Error");
      }
    };

    // Initial fetch
    updateGasPrices();

    // Set interval for fetching gas prices
    const intervalId = setInterval(updateGasPrices, refreshInterval);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  const gasInfo = (
    <Flex alignItems="center">
      <Icon as={MdLocalGasStation} color="gray.500" mr={2} />
      <Text mr={2}>ETH Gas: </Text>
      <Text fontWeight="bold" as="span" textShadow="0 0 10px rgba(255, 255, 255, 0.75)">
        {standardGasPrice} {standardGasPrice !== "Error" && standardGasPrice !== "N/A" && "Gwei"}
      </Text>
    </Flex>
  );

  return (
    <>
      {showTooltip ? (
        <Tooltip label={`Slow: ${slowGasPrice} Gwei | Medium: ${standardGasPrice} Gwei | Fast: ${fastGasPrice} Gwei`} aria-label="Gas Price Tooltip">
          {gasInfo}
        </Tooltip>
      ) : (
        { gasInfo }
      )}
    </>
  );
};

export default GasPriceInfo;
