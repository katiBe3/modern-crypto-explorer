import React from "react";
import { Box, Heading, Text, Flex, Spacer, Button, useColorMode, Table, Thead, Tbody, Tr, Th, Td, Image, Grid, GridItem, Icon, Stack, Link } from "@chakra-ui/react";
import { FaMoon, FaSun, FaGasPump, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      {/* Header */}
      <Flex px={4} py={2} alignItems="center">
        <Box>
          <Text fontWeight="bold" mr={8}>
            Markets
          </Text>
          <Text fontWeight="bold" mr={8}>
            Blog
          </Text>
          <Text fontWeight="bold" mr={8}>
            Explore
          </Text>
          <Text fontWeight="bold">Learn</Text>
        </Box>
        <Spacer />
        <Box>
          <Flex alignItems="center" mr={4}>
            <Icon as={FaGasPump} mr={2} />
            <Text>ETH Gas [x Gwei]</Text>
          </Flex>
          <Button onClick={toggleColorMode} mr={4}>
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </Button>
          <Button variant="ghost" mr={4}>
            Login
          </Button>
          <Button bg="#8A2BE2" color="white">
            Sign up
          </Button>
        </Box>
      </Flex>

      {/* Teaser area */}
      <Box textAlign="center" my={16}>
        <Heading mb={4}>Crypto Markets Surge as Institutional Adoption Grows</Heading>
        <Text fontSize="xl" color="gray.600">
          Embrace the future of finance with cryptocurrencies. Join the revolution today!
        </Text>
        <Box width="33%" mx="auto" mt={8}>
          <Box borderWidth={1} borderColor="gray.200" borderRadius="50%" height={200} position="relative">
            <Text fontSize="6xl" fontWeight="bold" color="green.500" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
              87
            </Text>
          </Box>
          <Text mt={4}>Extreme greed</Text>
        </Box>
      </Box>

      {/* Market data */}
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>1h%</Th>
              <Th>24h%</Th>
              <Th>7d%</Th>
              <Th>Market Cap</Th>
              <Th>Volume (24h)</Th>
              <Th>Circulating Supply</Th>
            </Tr>
          </Thead>
          <Tbody>{/* Add market data rows */}</Tbody>
        </Table>
      </Box>

      {/* Content cards */}
      <Grid templateColumns="repeat(3, 1fr)" gap={8} my={16}>
        <GridItem>
          <Heading size="md" mb={4}>
            ✨Top News
          </Heading>
          <Flex>
            <Image src="https://images.unsplash.com/photo-1621504450181-5d356f61d307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjcnlwdG98ZW58MHx8fHwxNzExMzkwNjc3fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="News" borderRadius="md" boxSize={100} objectFit="cover" mr={4} />
            <Text>Bitcoin reaches new all-time high as institutional investors flock to crypto</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Heading size="md" mb={4}>
            🔥 Hot right now
          </Heading>
          <Stack spacing={2}>
            <Flex>
              <Text fontWeight="bold">1. Ethereum</Text>
              <Spacer />
              <Text color="green.500">+5.2%</Text>
            </Flex>
            <Flex>
              <Text fontWeight="bold">2. Cardano</Text>
              <Spacer />
              <Text color="red.500">-2.1%</Text>
            </Flex>
            <Flex>
              <Text fontWeight="bold">3. Polkadot</Text>
              <Spacer />
              <Text color="green.500">+8.7%</Text>
            </Flex>
          </Stack>
        </GridItem>
        <GridItem>
          <Heading size="md" mb={4}>
            🎙️ Market Whispers
          </Heading>
          <Flex>
            <Image src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHxjcnlwdG98ZW58MHx8fHwxNzExMzkwNjc3fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Podcast" borderRadius="md" boxSize={100} objectFit="cover" mr={4} />
            <Text>Tune in to our latest podcast episode discussing the future of DeFi</Text>
          </Flex>
        </GridItem>
      </Grid>

      {/* Footer */}
      <Grid templateColumns="repeat(4, 1fr)" gap={8} color="gray.600" py={8}>
        <GridItem>
          <Text fontWeight="bold" mb={2}>
            Explore
          </Text>
          <Stack>
            <Link>Cryptocurrencies</Link>
            <Link>Exchanges</Link>
            <Link>Wallets</Link>
            <Link>NFTs</Link>
          </Stack>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold" mb={2}>
            Tools
          </Text>
          <Stack>
            <Link>Portfolio Tracker</Link>
            <Link>Price Alerts</Link>
            <Link>Tax Calculator</Link>
            <Link>Trading Simulator</Link>
          </Stack>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold" mb={2}>
            Support
          </Text>
          <Stack>
            <Link>Help Center</Link>
            <Link>Contact Us</Link>
            <Link>FAQ</Link>
            <Link>Security</Link>
          </Stack>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold" mb={2}>
            Company
          </Text>
          <Stack>
            <Link>About Us</Link>
            <Link>Careers</Link>
            <Link>Blog</Link>
            <Link>Press</Link>
          </Stack>
        </GridItem>
      </Grid>

      <Flex px={4} py={4} justifyContent="space-between" color="gray.500">
        <Text>© 2023 CryptoMarket. All rights reserved.</Text>
        <Box>
          <Icon as={FaTwitter} boxSize={6} mr={4} />
          <Icon as={FaFacebook} boxSize={6} mr={4} />
          <Icon as={FaInstagram} boxSize={6} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Index;
