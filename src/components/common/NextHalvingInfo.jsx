import React, { useState, useEffect } from "react";
import { Flex, Text, Icon, Tooltip } from "@chakra-ui/react";
import { FaBitcoin } from "react-icons/fa";

const NextHalvingInfo = ({ showTooltip = false }) => {
  const [daysUntilHalving, setDaysUntilHalving] = useState(null);
  const [remainingBlocks, setRemainingBlocks] = useState(null);
  const [blockTimeInSeconds, setBlockTimeInSeconds] = useState(null);

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
      } catch (error) {
        console.error("Error fetching block count:", error.message);
        // Set fallback values
        setRemainingBlocks(null); // Reset remaining blocks
        setDaysUntilHalving(null); // Reset days until halving
      }
    };

    const fetchBlockTime = async () => {
      try {
        const response = await fetch("https://blockchain.info/q/interval");
        if (!response.ok) {
          throw new Error("Failed to fetch block time");
        }
        const blockTimeInSeconds = await response.json();
        setBlockTimeInSeconds(blockTimeInSeconds);
      } catch (error) {
        console.error("Error fetching block time:", error.message);
        // Set fallback value
        setBlockTimeInSeconds(null); // Reset block time
      }
    };

    fetchBlockStats();
    fetchBlockTime();
  }, []);

  const formatBlockTime = (blockTimeInSeconds) => {
    if (blockTimeInSeconds === null) {
      return "N/A";
    }

    const blockTimeInMinutes = Math.floor(blockTimeInSeconds / 60);
    const blockTimeSeconds = parseInt(blockTimeInSeconds % 60);
    return `${blockTimeInMinutes}:${blockTimeSeconds < 10 ? '0' : ''}${blockTimeSeconds}`;
  };

  return (
    <Tooltip label={`Remaining Blocks: ${remainingBlocks}, Block Time: ${formatBlockTime(blockTimeInSeconds)} mins.`} aria-label="A tooltip">
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
