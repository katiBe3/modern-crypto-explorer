import React from 'react';
import { Text, Flex, Box, Heading, Input, Button } from '@chakra-ui/react';

const NewsletterSubscription  = () => {
  // You can add state and functions to handle the subscription logic

  return (
    <Box bg="#5A4FCF" width="full" py={20} align="center">
      <Heading textAlign="center" color="white" fontWeight="bold" mb={2}>
        Stay Ahead!💰
      </Heading>
      <Text textAlign="center" color="white" mb={4}>
        Subscribe to our newsletter for the latest news and insights.
      </Text>
      <Flex justifyContent="center">
        <Input placeholder="Enter your email" bg="purple.100" color="purple.900" mr={4} maxWidth="300px" />
        <Button bg="white" color="#5A4FCF" fontWeight="black" boxShadow="0 0 10px rgba(90, 79, 207, 0.5)">
          Subscribe
        </Button>
      </Flex>
    </Box>
  );
};

export default NewsletterSubscription;
