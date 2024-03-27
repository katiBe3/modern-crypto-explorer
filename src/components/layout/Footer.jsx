import React from "react";
import { Box, Grid, GridItem, Text, Stack, Link, Flex, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.800")} width="full" py={8} mt="auto">
      <Flex justifyContent="center" color={useColorModeValue("gray.600", "gray.300")}>
        <Text m="4">© 2023 CryptoMarket. All rights reserved.</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
