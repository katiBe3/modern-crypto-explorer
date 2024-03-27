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
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
      text: "Tune in to our latest podcast episode discussing the future of DeFi",
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
            🎙️ Market Whispers
          </Heading>
          {marketWhispers.map((item, index) => (
            <Flex key={index}>
              <Image src={item.image} alt="Podcast" borderRadius="md" boxSize="100px" objectFit="cover" mr={4} />
              <Text>{item.text}</Text>
            </Flex>
          ))}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default InfoCards;
