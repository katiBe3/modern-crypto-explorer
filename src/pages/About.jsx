import React from "react";
import { Box, Heading, Text, Avatar, AvatarGroup, Center } from "@chakra-ui/react";
import katrinImage from "../assets/images/katrin.jpg";

const About = () => {
  return (
    <Box m={8} maxWidth="1200px" mx="auto">
      <Heading as="h1" size="xl" mb={4} textAlign="center">
        About Us
      </Heading>
      <Text fontSize="xl" mb={8} textAlign="center">
      Created with lots of love, passion and coffee! ☕
      </Text>
      <Center my={6}>
        <AvatarGroup size="lg" max={2}>
          <Avatar name="Katrin" src={katrinImage} />
          <Avatar name="Robot" src="https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" />
        </AvatarGroup>
      </Center>
      <Center>
        <Text fontSize="md" maxWidth="800px">
          Katrin created this website with the incredible help of a little robot, who loves numbers and dopamine just as much as her. They are a great team and are always looking for new ways to improve this website. If you have any feedback or ideas, please let us know! In the meantime, have fun trading and remember:{" "}
          <Text as="span" fontWeight="bold">
            Trade carefully.🤗
          </Text>
        </Text>
      </Center>
    </Box>
  );
};

export default About;
