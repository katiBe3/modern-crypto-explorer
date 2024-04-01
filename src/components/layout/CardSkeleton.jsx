import React from "react";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import Card from "./Card";

const CardSkeleton = () => {
  return (
    <Card>
      <Stack spacing={4}>
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
      </Stack>
    </Card>
  );
};

export default CardSkeleton;
