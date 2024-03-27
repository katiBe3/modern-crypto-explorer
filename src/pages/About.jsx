import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Box, Heading, Text, Avatar, AvatarGroup, Center } from "@chakra-ui/react";

const About = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box px={8} py={4} maxWidth="1200px" mx="auto" textAlign="center">
        <Heading as="h1" size="xl" mt={10} mb={4}>
          About Us
        </Heading>
        <Text fontSize="lg" mb={4}>
          Created with lots of love, passion and coffee! ☕
        </Text>
        <Center my={6}>
          <AvatarGroup size="lg" max={2}>
            <Avatar name="Katrin" src="/src/assets/images/katrin.jpg" />
            <Avatar name="Robot" src="https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" />
          </AvatarGroup>
        </Center>
        <Center>
          <Text fontSize="md" maxWidth="800px">
            Katrin created this website with the incredible help of a little robot, who loves numbers and dopamine just as much as her. They are a great team and are always looking for new ways to improve this website. If you have any feedback or ideas, please let us know!
            In the meantime, have fun trading and remember: <Text as="span" fontWeight="bold">Trade carefully.🤗</Text> 
          </Text>
        </Center>
      </Box>
      <Footer />
    </Box>
  );
};

export default About;
