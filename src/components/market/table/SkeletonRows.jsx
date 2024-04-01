import React from "react";
import { Tr, Td, Skeleton, Hide } from "@chakra-ui/react";

const SkeletonRows = () => {
  const rows = Array.from({ length: 25 }, (_, index) => (
    <Tr key={index}>
      <Td px={{ base: 1, md: 4 }}>
        <Skeleton height="20px" width="40" />
      </Td>
      <Td px={{ base: 1, md: 4 }}>
        <Skeleton height="20px" width="40"/>
      </Td>
      <Hide below="md">
        <Td px={{ base: 1, md: 4 }}>
          <Skeleton height="20px" width="60"/>
        </Td>
        <Td px={{ base: 1, md: 4 }}>
          <Skeleton height="20px" width="60"/>
        </Td>
        <Td px={{ base: 1, md: 4 }}>
          <Skeleton height="20px" width="60"/>
        </Td>
      </Hide>
    </Tr>
  ));

  return <>{rows}</>;
};

export default SkeletonRows;
