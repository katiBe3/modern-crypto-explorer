import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Favorites = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box flex="1" px={8} py={4} maxWidth="1200px" mx="auto" textAlign="center">
        <Heading as="h1" size="xl" mt={10} mb={4}>
          Favorites Page
        </Heading>
        {}
      </Box>
      <Footer />
    </Box>
  );
};

export default Favorites;
