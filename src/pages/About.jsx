import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Box, Heading, Text, Avatar, AvatarGroup } from "@chakra-ui/react";

const About = () => {
  return (
    <Box align="center">
      <Header />
      <Box px={8} py={4} maxWidth="1200px" mx="auto" textAlign="center">
        <Heading as="h1" size="xl" mt={10} mb={4}>
          About CryptoMarket
        </Heading>
        <Text fontSize="lg" mb={4}>
          A unique collaboration between human passion and robotic precision.
        </Text>
        <AvatarGroup size="lg" max={2} justifyContent="center" my={6}>
          <Avatar name="Katrin" src="/src/assets/images/katrin.jpg" />
          <Avatar name="GPT Engineer" src="https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" />
        </AvatarGroup>
        <Text fontSize="md" maxWidth="800px" mx="auto">
          CryptoMarket was founded by Katrin and GPT Engineer – a dynamic duo who share a deep enthusiasm for numbers, dopamine, and the exhilarating pace of the crypto markets. Together, they've built a platform that caters to both seasoned traders and curious newcomers alike.
        </Text>
      </Box>
      <Footer />
    </Box>
  );
};

export default About;
