import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { tradingTips } from "../data/TradingTips";
import TradingTipCard from "../components/common/TradingTipCard";
import TableOfContents from "../components/common/TableOfContents";

const Learn = () => {
  return (
    <Box flex="1" px={8} py={4} maxWidth="1200px" mx="auto">
      <Heading as="h1" size="2xl" mt={10} mb={8} textAlign="center">
        Trading Tips
      </Heading>
      <Text textAlign="center" mb={8}>
        Discover the keys to successful crypto trading with our expert tips! From managing risks to mastering emotions, we've got you covered. Let's dive in and conquer the crypto markets together! 🚀
      </Text>
      <TableOfContents tips={tradingTips} />
      {tradingTips.map((tip, index) => (
        <TradingTipCard key={index} tip={tip} />
      ))}
    </Box>
  );
};

export default Learn;
