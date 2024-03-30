import React from "react";
import { Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import Card from "../../layout/Card";

const CryptoTrendCard = ({ title, assets, value, isColored = true }) => {
  const formatNumber = (number) => {
    // Check if the value contains "percent" (case insensitive)
    if (value.toLowerCase().includes("percent")) {
      return parseFloat(number).toFixed(2);
    } else {
      return parseInt(number).toLocaleString();
    }
  };

  return (
    <Card title={title}>
      <Stack spacing={4}>
        {assets.map((asset, index) => (
          <Flex key={index} fontWeight="bold">
            <Text color="gray.500">{`${index + 1}.`}</Text>
            <Text ml={2}>{asset.name}</Text>
            <Text ml={2} color="gray.500">
              {asset.symbol}
            </Text>
            <Spacer />
            <Text ml={2} color={isColored ? (parseFloat(asset[value]) >= 0 ? "green.400" : "red.400") : "inherit"}>
              {formatNumber(asset[value])}
              {value.toLowerCase().includes("percent") && "%"}
            </Text>
          </Flex>
        ))}
      </Stack>
    </Card>
  );
};

export default CryptoTrendCard;
