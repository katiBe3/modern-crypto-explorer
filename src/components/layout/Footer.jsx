import React, { memo } from "react";
import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <Box bg="gray.800" width="full" py={1} mt="auto">
      <Flex justifyContent="center" color="white">
        <Text m="4">© {currentYear} CryptoMarket. Built with love & AI. 🤖 </Text>
      </Flex>
    </Box>
  );
};

export default memo(Footer);
