import React, { useState, useEffect } from "react";
import { Box, Grid, GridItem, Heading, Flex, Image, Text, Stack, Spacer, useColorModeValue } from "@chakra-ui/react";

const InfoCards = ({ assets }) => {
  const topNews = [
    {
      image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307",
      text: "Bitcoin reaches new all-time high as institutional investors flock to crypto",
    },
  ];

  const [mostWanted, setMostWanted] = useState([]);

  const smallCapThreshold = 1e9;

  useEffect(() => {
    const fetchMostWantedData = async () => {
      try {
        const response = await fetch("https://api.coincap.io/v2/assets?limit=100&sort=changePercent24Hr&order=desc");
        const data = await response.json();
        const assets = data.data;

        const smallCaps = assets.filter((asset) => parseFloat(asset.marketCapUsd) < smallCapThreshold);
        const top3SmallCaps = smallCaps.slice(0, 3);

        const mostWantedData = top3SmallCaps.map((asset) => ({
          name: asset.name,
          symbol: asset.symbol,
          change: `+${parseFloat(asset.changePercent24Hr).toFixed(2)}%`,
        }));
        setMostWanted(mostWantedData);
      } catch (error) {
        console.error("Error fetching most wanted data:", error);
      }
    };

    fetchMostWantedData();
  }, []);

  const marketWhispers = [
    {
      image: "https://images.unsplash.com/photo-1589783160142-7f2c6b70d5e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      text: "ETH whales are making waves! 🌊 Their recent moves could signal a big splash in the market. Stay alert and ride the tide! 🚀",
    },
  ];

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={8} my={16} mx="auto" maxWidth="1200px" justifyItems="center" alignItems="stretch">
      <GridItem>
        <Box borderWidth="1px" borderColor="gray.200" boxShadow="md" p={4} borderRadius="md" height="100%" backgroundColor={useColorModeValue("gray.50", "gray.700")}>
          <Heading size="md" mb={4}>
            ✨ Rising Stars
          </Heading>
          {mostWanted.map((item, index) => (
            <Flex key={index} mb={4}>
              <Text fontWeight="bold">
                {index + 1}. {item.name} ({item.symbol})
              </Text>
              <Spacer />
              <Text color="green.500" fontWeight="bold">
                {item.change}
              </Text>
            </Flex>
          ))}
        </Box>
      </GridItem>
      <GridItem>
        <Box borderWidth="1px" borderColor="gray.200" boxShadow="md" p={4} borderRadius="md" h="100%" backgroundColor={useColorModeValue("gray.50", "gray.700")}>
          <Heading size="md" mb={4}>
            🔥 Most Wanted
          </Heading>
          <Stack spacing={2}>
            {mostWanted.map((item, index) => (
              <Flex key={index}>
                <Text fontWeight="bold">
                  {index + 1}. {item.name}
                </Text>
                <Spacer />
                <Text color={item.change.includes("+") ? "green.500" : "red.500"} fontWeight="bold">
                  {item.change}
                </Text>
              </Flex>
            ))}
          </Stack>
        </Box>
      </GridItem>
      <GridItem>
        <Box borderWidth="1px" borderColor="gray.200" boxShadow="md" p={4} borderRadius="md" h="100%" backgroundColor={useColorModeValue("gray.50", "gray.700")}>
          <Heading size="md" mb={4}>
            🐳 Whale Watch
          </Heading>
          {marketWhispers.map((item, index) => (
            <Flex key={index}>
              <Text width="100%">{item.text}</Text>
            </Flex>
          ))}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default InfoCards;
