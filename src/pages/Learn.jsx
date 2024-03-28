import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const Learn = () => {
  return (
    <Layout>
      <Box flex="1" px={8} py={4} maxWidth="1200px" mx="auto" textAlign="center">
        <Heading as="h1" size="xl" mt={10} mb={4}>
          Learn Page
        </Heading>
        {}
      </Box>
    </Layout>
  );
};

export default Learn;
