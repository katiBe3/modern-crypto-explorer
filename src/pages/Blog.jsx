import React, { useState } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import WhaleWatchPost from "../components/blog/WhaleWatchPost";

const Blog = () => {
  const [whaleWatchPosts, setWhaleWatchPosts] = useState([
    {
      id: 1,
      title: "Whale Watch: Large BTC Transfer Spotted",
      content: "A whale has moved 10,000 BTC (worth over $500 million) from a wallet to an exchange, potentially signaling a large sell-off.",
      timestamp: "2024-03-28T10:30:00Z",
    },
    {
      id: 2,
      title: "Whale Watch: ETH Accumulation Continues",
      content: "Several Ethereum whales have been accumulating large amounts of ETH over the past week, with one wallet adding 100,000 ETH (worth over $200 million).",
      timestamp: "2024-03-27T15:45:00Z",
    },
  ]);

  const [displayedPosts, setDisplayedPosts] = useState(2);

  const loadMorePosts = () => {
    setDisplayedPosts((prevDisplayedPosts) => prevDisplayedPosts + 2);
  };

  return (
    <Box flex="1" px={8} py={4} maxWidth="1200px" mx="auto">
      <Heading as="h1" size="xl" mt={10} mb={8} textAlign="center">
        Whale Watch
      </Heading>
      {whaleWatchPosts.slice(0, displayedPosts).map((post) => (
        <WhaleWatchPost key={post.id} post={post} />
      ))}
      {displayedPosts < whaleWatchPosts.length && (
        <Box textAlign="center">
          <Button onClick={loadMorePosts} colorScheme="blue" size="lg">
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Blog;
