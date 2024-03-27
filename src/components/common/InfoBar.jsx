import { Box, Text } from "@chakra-ui/react";

const InfoBar = () => {
  return (
    <Box bg="blue.500" py={2}>
      <Text color="white" textAlign="center">
        Welcome to the site! Check out our latest updates.
      </Text>
    </Box>
  );
};

export default InfoBar;
