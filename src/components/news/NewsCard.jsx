import React from "react";
import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
import Card from "../layout/Card";

const NewsCard = ({ newsItem }) => {
  return (
    <Card>
      <Flex>
        <Image src={newsItem.imageurl} alt={newsItem.title} boxSize="100px" objectFit="cover" mr={4} />
        <Box>
          <Heading size="sm" mb={2}>
            {newsItem.title}
          </Heading>
          <Text fontSize="sm">{newsItem.body.split(". ")[0]}.</Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default NewsCard;
