import React from "react";
import { Text, Flex, Box, Heading, Input, Button } from "@chakra-ui/react";

const NewsletterSubscription = () => {
  return (
    <Box bg="#5A4FCF" width="full" py={{ base: 10, md: 20 }} px={4} align="center">
      <Heading textAlign="center" color="white" fontWeight="bold" mb={2} fontSize={{ base: "2xl", md: "3xl" }}>
        Stay Ahead!💰
      </Heading>
      <Text textAlign="center" color="white" mb={4} fontSize={{ base: "md", md: "lg" }}>
        Subscribe to our newsletter for the latest news and insights.
      </Text>
      <Flex direction={{ base: "column", md: "row" }} align="center" justifyContent="center">
        <Input placeholder="Enter your email" bg="purple.100" color="purple.900" mr={{ base: 0, md: 4 }} mb={{ base: 4, md: 0 }} maxWidth={{ base: "100%", md: "400px" }} />
        <Button bg="white" color="#5A4FCF" fontWeight="black" boxShadow="0 0 10px rgba(90, 79, 207, 0.5)">
          Subscribe
        </Button>
      </Flex>
    </Box>
  );
};

export default NewsletterSubscription;
