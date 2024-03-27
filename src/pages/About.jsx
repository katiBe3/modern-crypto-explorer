import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";

const About = () => {
  return (
    <Box align="center">
      <Header />
      <Box px={8} py={4} maxWidth="1200px" mx="auto">
        <Heading as="h1" size="xl" mt={10} mb={4}>
          About CryptoMarket
        </Heading>
        <Text fontSize="lg" mb={4}>
          A unique collaboration between human passion and robotic precision.
        </Text>
        <Flex direction={{ base: "column", md: "row" }} align="center" justify="center">
          <Image src="https://via.placeholder.com/150" borderRadius="full" boxSize="150px" alt="Profile Image of a Woman" mr={{ md: 4 }} mb={{ base: 4, md: 0 }} />
          <Image src="https://via.placeholder.com/150" borderRadius="full" boxSize="150px" alt="Profile Image of a Robot" ml={{ md: 4 }} />
        </Flex>
        <Text fontSize="md" mt={4}>
          CryptoMarket was founded by Jane Doe and Robo-Crypto – a dynamic duo who share a deep enthusiasm for numbers, dopamine, and the exhilarating pace of the crypto markets. Together, they've built a platform that caters to both seasoned traders and curious newcomers alike.
        </Text>
      </Box>
      <Footer />
    </Box>
  );
};

export default About;
