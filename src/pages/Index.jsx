import React, { useState } from "react";
import { Box, Heading, Text, Flex, Spacer, Button, useColorMode, Table, Thead, Tbody, Tr, Th, Td, Image, Grid, GridItem, Icon, Stack, Link } from "@chakra-ui/react";
import { FaMoon, FaSun, FaGasPump, FaTwitter, FaFacebook, FaInstagram, FaStar } from "react-icons/fa";
import { cryptoData } from "../data/MockData";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [sortConfig, setSortConfig] = useState({ key: "marketCap", direction: "descending" });

  const toggleFavorite = (name) => {
    const updatedCryptoData = cryptoData.map((crypto) => {
      if (crypto.name === name) {
        return { ...crypto, isFavorite: !crypto.isFavorite };
      }
      return crypto;
    });
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedCryptoData = [...cryptoData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <Box>
      {}
      <Flex px={4} py={2} alignItems="center" justifyContent="space-between">
        <Flex>
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
        </Flex>
        <Flex alignItems="center">
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
        </Flex>
      </Flex>

      {}
      <Box textAlign="center" my={16} mx={8}>
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
              <Th></Th>
              <Th>
                <Button onClick={() => requestSort("name")} variant="link">
                  Name
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("price")} variant="link">
                  Price
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("percentChange1h")} variant="link">
                  1h%
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("percentChange24h")} variant="link">
                  24h%
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("percentChange7d")} variant="link">
                  7d%
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("marketCap")} variant="link">
                  Market Cap
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("volume24h")} variant="link">
                  Volume (24h)
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("circulatingSupply")} variant="link">
                  Circulating Supply
                </Button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedCryptoData.map((crypto) => (
              <Tr key={crypto.name}>
                <Td>
                  <Icon as={FaStar} color={crypto.isFavorite ? "yellow.400" : "gray.300"} onClick={() => toggleFavorite(crypto.name)} _hover={{ cursor: "pointer" }} />
                </Td>
                <Td>
                  <Text fontWeight="bold">{crypto.name}</Text>
                  <Text color="gray.500">{crypto.shortName}</Text>
                </Td>
                <Td>${crypto.price.toLocaleString()}</Td>
                <Td>
                  <Text fontWeight="bold" color={crypto.percentChange1h >= 0 ? "green.400" : "red.400"}>
                    {crypto.percentChange1h}%
                  </Text>
                </Td>
                <Td>
                  <Text fontWeight="bold" color={crypto.percentChange24h >= 0 ? "green.400" : "red.400"}>
                    {crypto.percentChange24h}%
                  </Text>
                </Td>
                <Td>
                  <Text fontWeight="bold" color={crypto.percentChange7d >= 0 ? "green.400" : "red.400"}>
                    {crypto.percentChange7d}%
                  </Text>
                </Td>
                <Td>${crypto.marketCap.toLocaleString()}</Td>
                <Td>${crypto.volume24h.toLocaleString()}</Td>
                <Td>{crypto.circulatingSupply.toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {}
      <Grid templateColumns="repeat(3, 1fr)" gap={8} my={16} mx={8}>
        <GridItem>
          <Box borderWidth={1} borderColor="gray.200" boxShadow="md" p={4} borderRadius="md" h="100%">
            <Heading size="md" mb={4}>
              ✨Top News
            </Heading>
            <Flex>
              <Image src="https://images.unsplash.com/photo-1621504450181-5d356f61d307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjcnlwdG98ZW58MHx8fHwxNzExMzkwNjc3fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="News" borderRadius="md" boxSize={100} objectFit="cover" mr={4} />
              <Text>Bitcoin reaches new all-time high as institutional investors flock to crypto</Text>
            </Flex>
          </Box>
        </GridItem>
        <GridItem>
          <Box borderWidth={1} borderColor="gray.200" boxShadow="md" p={4} borderRadius="md" h="100%">
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
          </Box>
        </GridItem>
        <GridItem>
          <Box borderWidth={1} borderColor="gray.200" boxShadow="md" p={4} borderRadius="md" h="100%">
            <Heading size="md" mb={4}>
              🎙️ Market Whispers
            </Heading>
            <Flex>
              <Image src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHxjcnlwdG98ZW58MHx8fHwxNzExMzkwNjc3fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Podcast" borderRadius="md" boxSize={100} objectFit="cover" mr={4} />
              <Text>Tune in to our latest podcast episode discussing the future of DeFi</Text>
            </Flex>
          </Box>
        </GridItem>
      </Grid>

      {/* Footer */}
      <Box bg="gray.100" width="full">
        <Grid templateColumns="repeat(4, 1fr)" gap={8} color="gray.600" py={8} maxWidth="1200px" mx="auto" bg="gray.200">
          <GridItem>
            <Text fontWeight="bold" mb={2}>
              Explore
            </Text>
            <Stack>
              <Link fontWeight="bold">Cryptocurrencies</Link>
              <Link fontWeight="bold">Exchanges</Link>
              <Link fontWeight="bold">Wallets</Link>
              <Link fontWeight="bold">NFTs</Link>
            </Stack>
          </GridItem>
          <GridItem>
            <Text fontWeight="bold" mb={2}>
              Tools
            </Text>
            <Stack>
              <Link fontWeight="bold">Portfolio Tracker</Link>
              <Link fontWeight="bold">Price Alerts</Link>
              <Link fontWeight="bold">Tax Calculator</Link>
              <Link fontWeight="bold">Trading Simulator</Link>
            </Stack>
          </GridItem>
          <GridItem>
            <Text fontWeight="bold" mb={2}>
              Support
            </Text>
            <Stack>
              <Link fontWeight="bold">Help Center</Link>
              <Link fontWeight="bold">Contact Us</Link>
              <Link fontWeight="bold">FAQ</Link>
              <Link fontWeight="bold">Security</Link>
            </Stack>
          </GridItem>
          <GridItem>
            <Text fontWeight="bold" mb={2}>
              Company
            </Text>
            <Stack>
              <Link fontWeight="bold">About Us</Link>
              <Link fontWeight="bold">Careers</Link>
              <Link fontWeight="bold">Blog</Link>
              <Link fontWeight="bold">Press</Link>
            </Stack>
          </GridItem>
        </Grid>
      </Box>

      <Flex px={4} py={4} justifyContent="space-between" color="gray.600" maxWidth="1200px" mx="auto" bg="gray.200">
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
