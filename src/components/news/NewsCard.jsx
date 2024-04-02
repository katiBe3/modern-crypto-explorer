import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Text, Skeleton, Image } from "@chakra-ui/react";
import Card from "../layout/Card";

const NewsCard = ({ newsItem }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Timeout set to half a second.

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
  };

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
          {loading ? (
            <Skeleton height="150px" width="150px" borderRadius="8px" mr={4} />
          ) : (
            <Image
              src={newsItem.imageurl}
              alt={newsItem.title}
              onLoad={handleImageLoad}
              onError={handleImageError}
              borderRadius="8px"
              mr="12px"
              objectFit="cover"
              boxSize="150px"
              maxWidth="150px"
            />
          )}
          <Box align="left">
            <Skeleton isLoaded={!loading}>
              <Heading size="sm" mb={2}>
                {truncateText(newsItem.title, 100)}
              </Heading>
            </Skeleton>
            <Skeleton isLoaded={!loading}>
              <Text fontSize="sm" color="gray.500" fontWeight="bold" mb={2}>
                {newsItem.source_info.name}
              </Text>
            </Skeleton>
          </Box>
        </Flex>
      </Box>
    </Card>
  );
};

export default NewsCard;
