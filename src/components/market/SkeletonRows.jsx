import React from "react";
import { Tr, Td, Skeleton } from "@chakra-ui/react";

const SkeletonRows = () => {
  const rows = Array.from({ length: 5 }, (_, index) => (
    <Tr key={index}>
      <Td px={{ base: 1, md: 4 }}>
        <Skeleton height="20px" />
      </Td>
      <Td px={{ base: 1, md: 4 }}>
        <Skeleton height="20px" />
      </Td>
      <Td px={{ base: 1, md: 4 }}>
        <Skeleton height="20px" />
      </Td>
      <Td px={{ base: 1, md: 4 }}>
        <Skeleton height="20px" />
      </Td>
      <Td px={{ base: 1, md: 4 }}>
        <Skeleton height="20px" />
      </Td>
    </Tr>
  ));

  return <>{rows}</>;
};

export default SkeletonRows;
