import React from "react";
import { Box } from "@chakra-ui/react";

const Bar = ({ children }) => {
  return (
    <Box bg="brand.main" py={2} px={4} overflowX="auto" whiteSpace="nowrap">
        <Box color="white" textAlign="left" fontSize="sm" display="flex" alignItems="center">
        {children}
        </Box>
    </Box>
  );
};

export default Bar;
