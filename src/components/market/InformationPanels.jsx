import React from 'react';
import { Box, Grid, GridItem, Heading, Flex, Image, Text, Stack, Spacer, useColorModeValue } from '@chakra-ui/react';

const InformationPanels = () => {
  // Sample data, replace or fetch from API
  const topNews = [
    {
      image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307",
      text: "Bitcoin reaches new all-time high as institutional investors flock to crypto",
    },
    // Add more news items as needed
  ];

  const mostWanted = [
    { name: "Ethereum", change: "+5.2%" },
    { name: "Cardano", change: "-2.1%" },
    { name: "Polkadot", change: "+8.7%" },
    // Add more items as needed
  ];

  const marketWhispers = [
    {
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
      text: "Tune in to our latest podcast episode discussing the future of DeFi",
    },
    // Add more items as needed
  ];

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={8} my={16} mx={8} maxWidth="1200px">
      <GridItem>
        <Box borderWidth="1px" borderColor="gray.200" boxShadow="md" p={4} borderRadius="md" h="100%" backgroundColor={useColorModeValue("gray.50", "gray.700")}>
          <Heading size="md" mb={4}>✨ Top News</Heading>
          {topNews.map((item, index) => (
            <Flex key={index} mb={4}>
              <Image src={item.image} alt="News" borderRadius="md" boxSize="100px" objectFit="cover" mr={4} />
              <Text>{item.text}</Text>
            </Flex>
          ))}
        </Box>
      </GridItem>
      <GridItem>
        <Box borderWidth="1px" borderColor="gray.200" boxShadow="md" p={4} borderRadius="md" h="100%" backgroundColor={useColorModeValue("gray.50", "gray.700")}>
          <Heading size="md" mb={4}>🔥 Most Wanted</Heading>
          <Stack spacing={2}>
            {mostWanted.map((item, index) => (
              <Flex key={index}>
                <Text fontWeight="bold">{index + 1}. {item.name}</Text>
                <Spacer />
                <Text color={item.change.includes("+") ? "green.500" : "red.500"} fontWeight="bold">{item.change}</Text>
              </Flex>
            ))}
          </Stack>
        </Box>
      </GridItem>
      <GridItem>
        <Box borderWidth="1px" borderColor="gray.200" boxShadow="md" p={4} borderRadius="md" h="100%" backgroundColor={useColorModeValue("gray.50", "gray.700")}>
          <Heading size="md" mb={4}>🎙️ Market Whispers</Heading>
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

export default InformationPanels;
