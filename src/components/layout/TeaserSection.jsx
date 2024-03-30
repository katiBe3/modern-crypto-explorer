import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const TeaserSection = ({ topic, headline, children }) => {
  return (
    <Box bg="brand.main" width="full" py={{ base: 5, md: 10 }} px={4} align="center" color="white" mb={8}>
      <Heading textAlign="center" fontWeight="bold" m={4} fontSize="xl">{topic}</Heading>
      <Box maxWidth="820px">
        <Heading textAlign="center" fontWeight="bold" mb={2} fontSize={{ base: "2xl", md: "3xl" }}>
          {headline}
        </Heading>
        <Text textAlign="center" color="white" mb={4} fontSize={{ base: "md", md: "lg" }}>
          {children}
        </Text>
      </Box>
    </Box>
  );
};

export default TeaserSection;