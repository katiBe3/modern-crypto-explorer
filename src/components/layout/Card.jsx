import React from "react";
import { Box, GridItem, Heading, useColorMode } from "@chakra-ui/react";

const Card = ({ title, children }) => {
    const { colorMode } = useColorMode();
    const bgColor = colorMode === "light" ? "gray.50" : "gray.700";
    
    return (
        <GridItem align="center">
            <Box minHeight={210} borderWidth="2px" borderColor="gray.100" p={4} borderRadius="md" backgroundColor={bgColor}>
                {title && <Heading size="md" mb={4}>{title}</Heading>}
                {children}
            </Box>
        </GridItem>
    );
};

export default Card;
