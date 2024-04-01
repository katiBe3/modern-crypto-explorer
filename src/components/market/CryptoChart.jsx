import React, { useMemo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const CryptoChart = ({ data, color }) => {
  const chartData = useMemo(() => {
    if (!data) return null;

    return {
      datasets: [
        {
          label: "Price",
          data: data.map((dataPoint) => ({
            x: new Date(dataPoint.time),
            y: parseFloat(dataPoint.priceUsd),
          })),
          borderColor: color,
          backgroundColor: color,
          pointRadius: 0,
        },
      ],
    };
  }, [data, color]);

  if (!data) return null;

  return (
    <Box>
      <Flex justify="space-between" mb={4}>
        {data.map((dataPoint) => (
          <Text key={dataPoint.time} fontSize="sm">
            {new Date(dataPoint.time).toLocaleDateString()}
          </Text>
        ))}
      </Flex>
      <Flex h={200} align="flex-end">
        {data.map((dataPoint) => (
          <Box key={dataPoint.time} w={`${100 / data.length}%`} h={`${(parseFloat(dataPoint.priceUsd) / Math.max(...data.map((d) => parseFloat(d.priceUsd)))) * 100}%`} bg={color} title={`$${parseFloat(dataPoint.priceUsd).toFixed(2)}`} />
        ))}
      </Flex>
    </Box>
  );
};

export default CryptoChart;
