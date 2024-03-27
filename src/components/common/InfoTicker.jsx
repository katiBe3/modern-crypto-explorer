import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const InfoBar = () => {
  return (
    <Box bg="gray.800" py={2} px={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="white" fontWeight="bold">
          BTC dominance: 40.5% | ETH gas fees: 20 Gwei | Total market cap: $1.2T
        </Text>
      </Flex>
    </Box>
  );
};

export default InfoBar;
