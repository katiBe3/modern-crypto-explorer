import React from "react";
import { Box } from "@chakra-ui/react";

const CardSlider = ({ cards }) => {
  return (
    <Box overflowX="auto" whiteSpace="nowrap">
      {cards.map((card, index) => (
        <Box key={index} display="inline-block" width="100%" p={4}>
          {card}
        </Box>
      ))}
    </Box>
  );
};

export default CardSlider;
