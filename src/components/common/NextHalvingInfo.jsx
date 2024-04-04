import React, { useEffect } from "react";
import { Flex, Text, Icon, Tooltip } from "@chakra-ui/react";
import { FaBitcoin } from "react-icons/fa";
import useNextHalvingInfoStore from "../../stores/useNextHalvingInfoStore"; // Adjust the import path as necessary

const NextHalvingInfo = ({ showTooltip = false }) => {
  const { daysUntilHalving, remainingBlocks, blockTimeInSeconds, fetchNextHalvingInfo } = useNextHalvingInfoStore(state => ({
    daysUntilHalving: state.daysUntilHalving,
    remainingBlocks: state.remainingBlocks,
    blockTimeInSeconds: state.blockTimeInSeconds,
    fetchNextHalvingInfo: state.fetchNextHalvingInfo,
  }));

  useEffect(() => {
    fetchNextHalvingInfo();
  }, [fetchNextHalvingInfo]);

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
          {daysUntilHalving !== null ? `${daysUntilHalving} days` : "Loading..."}
        </Text>
      </Flex>
    </Tooltip>
  );
};

export default NextHalvingInfo;
