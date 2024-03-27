import { Box, Text } from "@chakra-ui/react";

const InfoBar = () => {
  return (
    <Box bg="gray.700" py={2} px={4}>
      <Text color="white" textAlign="left">
      BTC dominance: <Text as="span" fontWeight="bold">40.5%</Text>  <Text as="span" fontWeight="bold">🔥Most Wanted:</Text> ETH <Text as="span" fontWeight="bold" color="green.500">1 +2.2%</Text> <Text as="span" fontWeight="bold">✨Rising Stars:</Text>
      </Text>
    </Box>
  );
};

export default InfoBar;
