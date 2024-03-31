import React, { useState, useEffect } from "react";
import { Flex, Text, Icon, Tooltip } from "@chakra-ui/react";
import { FaBitcoin } from "react-icons/fa";

const NextHalvingInfo = ({ showTooltip = false }) => {
  const [daysUntilHalving, setDaysUntilHalving] = useState(null);
  const [remainingBlocks, setRemainingBlocks] = useState(null);
  const [approximateBlockTime, setApproximateBlockTime] = useState(null);

  useEffect(() => {
    const fetchBlockStats = async () => {
      try {
        const response = await fetch("https://blockchain.info/q/getblockcount");
        if (!response.ok) {
          throw new Error("Failed to fetch block count");
        }
        const blockCount = await response.json();

        // Assuming Bitcoin's halving occurs every 210,000 blocks
        const blocksUntilHalving = 210000 - (blockCount % 210000);
        const daysUntilHalving = Math.ceil(blocksUntilHalving / (6 * 24)); // Assuming 6 blocks per hour and 24 hours per day

        setRemainingBlocks(blocksUntilHalving);
        setDaysUntilHalving(daysUntilHalving);

        // Now fetch additional data to calculate approximate block time using interval query
        const blockTimeResponse = await fetch("https://blockchain.info/q/interval");
        if (!blockTimeResponse.ok) {
          throw new Error("Failed to fetch block time");
        }
        const blockTimeInSeconds = await blockTimeResponse.json();
        
        // Convert block time from seconds to minutes
        const blockTimeInMinutes = blockTimeInSeconds / 60;
        setApproximateBlockTime(blockTimeInMinutes);
      } catch (error) {
        console.error("Error:", error.message);
        // Set fallback values
        setRemainingBlocks(null); // Reset remaining blocks
        setDaysUntilHalving(null); // Reset days until halving
        setApproximateBlockTime(null); // Reset approximate block time
      }
    };

    fetchBlockStats();
  }, []);

  return (
    <Tooltip label={`Remaining Blocks: ${remainingBlocks}, Approximate Block Time: ${parseInt(approximateBlockTime)} minutes`} aria-label="A tooltip">
      <Flex alignItems="center" cursor="pointer">
        <Icon as={FaBitcoin} color="orange.400" mr={2} />
        <Text mr={2}>Next Halving: </Text>
        <Text fontWeight="bold" as="span" textShadow="0 0 10px rgba(255, 255, 255, 0.75)">
          {daysUntilHalving !== null ? daysUntilHalving + " days" : "Loading..."}
        </Text>
      </Flex>
    </Tooltip>
  );
};

export default NextHalvingInfo;
