import React from "react";
import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
import Card from "../layout/Card";

const NewsCard = ({ newsItem }) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Card>
      <Box as="a" href={newsItem.url} target="_blank" _hover={{ textDecoration: "none" }}>
        <Flex>
          <Image src={newsItem.imageurl} alt={newsItem.title} boxSize={{ base: "full", md: "175px" }} objectFit="cover" mr={4} borderRadius="8px" />
          <Box align="left">
            <Heading size="sm" mb={2}>
              {truncateText(newsItem.title, 100)}
            </Heading>
            <Text fontSize="sm" color="gray.500" fontWeight="bold" mb={2}>
              {newsItem.source_info.name}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Card>
  );
};

export default NewsCard;
