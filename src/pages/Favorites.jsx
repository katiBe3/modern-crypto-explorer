import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import CryptoTable from "../components/market/CryptoTable";

const Favorites = () => {
  return (
    <Layout>
      <Box flex="1" px={8} py={4} maxWidth="1200px" mx="auto" textAlign="center">
        <Heading as="h1" size="xl" mt={10} mb={4}>
          Your Favorite Cryptocurrencies
        </Heading>
        <Text fontSize="lg" mb={8}>
          Keep your most loved cryptocurrencies close and never miss a beat in the market!
        </Text>
        <CryptoTable showFavoritesOnly={true} />
      </Box>
     </Layout>
  );
};

export default Favorites;
