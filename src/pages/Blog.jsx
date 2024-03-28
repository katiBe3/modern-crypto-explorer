import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Layout from "../components/layout/Layout";

const Blog = () => {
  return (
   <Layout>
      <Box flex="1" px={8} py={4} maxWidth="1200px" mx="auto" textAlign="center">
        <Heading as="h1" size="xl" mt={10} mb={4}>
          Blog Page
        </Heading>
        {}
      </Box>
    </Layout>
  );
};

export default Blog;
