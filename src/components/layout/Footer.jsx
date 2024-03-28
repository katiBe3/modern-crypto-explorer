import React from "react";
import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <Box bg="#100D30" width="full" py={1} mt="auto">
      <Flex justifyContent="center" color="white">
        <Text m="4">© {currentYear} CryptoMarket. Built with passion & AI. 🤖 </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
