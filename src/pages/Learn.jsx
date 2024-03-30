import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import TeaserSection from "../components/layout/TeaserSection";

// Import or define the tradingTips data
import { tradingTips } from "../data/TradingTips"; // Adjust the path as necessary

const Learn = () => {
  return (
    <>
      <TeaserSection headline="Trading Tips">
        Discover the keys to successful crypto trading with our expert tips! From managing risks to mastering emotions, we've got you covered. Let's dive in and conquer the crypto markets together! 🚀
      </TeaserSection>
      <Flex direction="column" alignItems="center" flex="1" px={8} py={4} maxWidth="820" mx="auto" mb="8">
        <Box width="100%">
          {tradingTips.map((tip) => (
            <Box mb={10} key={tip.id} maxWidth="720">
              <Heading size="md" as="h2"> {tip.title} </Heading>          
              <Text color="gray.800"> {tip.text} </Text>
            </Box>
          ))}
        </Box>
      </Flex>
    </>
  );
};

export default Learn;
