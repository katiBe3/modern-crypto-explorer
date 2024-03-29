import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const WhaleWatchPost = ({ post }) => {
  return (
    <Box bg="white" borderRadius="md" p={6} boxShadow="md" mb={8}>
      <Heading as="h2" size="xl" mb={2}>
        {post.title}
      </Heading>
      <Text fontSize="sm" color="gray.500" mb={4}>
        {new Date(post.timestamp).toLocaleString()}
      </Text>
      <Text fontSize="lg">{post.content}</Text>
    </Box>
  );
};

export default WhaleWatchPost;
