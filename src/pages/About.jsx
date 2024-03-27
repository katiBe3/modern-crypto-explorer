import React from 'react';
import { Box, Heading, Text, Image, Stack } from '@chakra-ui/react';

const About = () => {
  return (
    <Box p={8}>
      <Heading as="h1" size="2xl" mb={4}>
        About Us
      </Heading>
      <Heading as="h2" size="xl" mb={4}>
        The Crypto Dream Team
      </Heading>
      <Stack direction={['column', 'row']} spacing={8} mb={8}>
        <Image 
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80" 
          alt="Woman smiling"
          borderRadius="full"
          boxSize="150px"
        />
        <Image 
          src="https://images.unsplash.com/photo-1601985705806-5b9a71f6004f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          alt="Robot"
          borderRadius="full" 
          boxSize="150px"
        />
      </Stack>
      <Text fontSize="xl">
        Meet Liz and Botty - an unlikely pair united by their love for numbers, 
        dopamine rushes, and the thrill of fast-moving markets. Together, they've 
        built this crypto website to share their passion with the world. Liz brings 
        her human touch and intuition, while Botty contributes lightning-fast 
        calculations and unwavering objectivity. Get ready for a wild ride as this 
        dynamic duo guides you through the exhilarating world of cryptocurrencies!
      </Text>
    </Box>
  );
};

export default About;