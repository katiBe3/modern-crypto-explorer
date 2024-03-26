import React from 'react';
import { Box, Grid, GridItem, Text, Stack, Link, Flex, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.800")} width="full">
      <Grid templateColumns="repeat(4, 1fr)" gap={8} color={useColorModeValue("gray.600", "gray.300")} py={8} maxWidth="1200px" mx="auto" fontWeight="bold">
        <GridItem>
          <Text fontWeight="bold" mb={2}>
            Explore
          </Text>
          <Stack color={useColorModeValue("gray.700", "gray.200")}>
            <Link>Cryptocurrencies</Link>
            <Link>Exchanges</Link>
            <Link>Wallets</Link>
            <Link>NFTs</Link>
          </Stack>
        </GridItem>
        <GridItem>
          <Text mb={2}>Tools</Text>
          <Stack color={useColorModeValue("gray.700", "gray.200")}>
            <Link>Portfolio Tracker</Link>
            <Link>Price Alerts</Link>
            <Link>Tax Calculator</Link>
            <Link>Trading Simulator</Link>
          </Stack>
        </GridItem>
        <GridItem>
          <Text mb={2}>Support</Text>
          <Stack color={useColorModeValue("gray.700", "gray.200")}>
            <Link>Help Center</Link>
            <Link>Contact Us</Link>
            <Link>FAQ</Link>
            <Link>Security</Link>
          </Stack>
        </GridItem>
        <GridItem>
          <Text mb={2}>Company</Text>
          <Stack color={useColorModeValue("gray.700", "gray.200")}>
            <Link>About Us</Link>
            <Link>Careers</Link>
            <Link>Blog</Link>
            <Link>Press</Link>
          </Stack>
        </GridItem>
      </Grid>
      <Flex justifyContent="center" color={useColorModeValue("gray.600", "gray.300")} maxWidth="1200" mx="auto">
        <Text m="4">© 2023 CryptoMarket. All rights reserved.</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
