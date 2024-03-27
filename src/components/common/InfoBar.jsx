import { Box, Text } from "@chakra-ui/react";

const InfoBar = () => {
  return (
    <Box bg="gray.700" py={2} px={4}>
      <Text color="white" textAlign="left" fontSize="sm">
        Dominance: BTC 40% ETH 20%
      </Text>
    </Box>
  );
};

export default InfoBar;
