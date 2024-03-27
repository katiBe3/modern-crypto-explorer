import React from "react";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { FaBitcoin } from "react-icons/fa";

const NextHalvingInfo = () => {
  const calculateDaysUntilHalving = () => {
    const halvingInterval = 210000; // Blocks
    const averageBlockTime = 10; // Minutes

    const currentBlockHeight = 793968; // Replace with actual current block height
    const nextHalvingBlockHeight = Math.ceil(currentBlockHeight / halvingInterval) * halvingInterval;

    const blocksUntilHalving = nextHalvingBlockHeight - currentBlockHeight;
    const minutesUntilHalving = blocksUntilHalving * averageBlockTime;
    const daysUntilHalving = Math.ceil(minutesUntilHalving / 1440); // 1440 minutes in a day

    return daysUntilHalving;
  };

  const daysUntilHalving = calculateDaysUntilHalving();

  return (
    <Flex alignItems="center">
      <Icon as={FaBitcoin} color="orange.400" mr={2} />
      <Text fontWeight="bold">Halving: {daysUntilHalving} days</Text>
    </Flex>
  );
};

export default NextHalvingInfo;