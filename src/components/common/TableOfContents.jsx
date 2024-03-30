import React from "react";
import { Box, Link } from "@chakra-ui/react";

const TableOfContents = ({ tips }) => {
  return (
    <Box mb={8}>
      <Box as="h2" fontSize="2xl" mb={4}>
        Table of Contents
      </Box>
      {tips.map((tip, index) => (
        <Link key={index} display="block" mb={2} href={`#${tip.id}`}>
          {tip.title}
        </Link>
      ))}
    </Box>
  );
};

export default TableOfContents;
