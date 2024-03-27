import { Box, Text, useColorModeValue } from "@chakra-ui/react";

const InfoBar = () => {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.700")} py={2} px={4}>
      <Text color={useColorModeValue("black", "white")} textAlign="left" fontSize="sm">
        Dominance: BTC 40% ETH 20%
      </Text>
    </Box>
  );
};

export default InfoBar;
