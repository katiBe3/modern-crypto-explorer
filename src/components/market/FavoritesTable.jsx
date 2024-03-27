import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";

const FavoritesTable = ({ favorites }) => {
  return (
    <Box overflowX="auto" maxWidth="1200px" mt={8} mx="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>24h%</Th>
            <Th>Market Cap</Th>
            <Th>Volume (24h)</Th>
            <Th>Circulating Supply</Th>
          </Tr>
        </Thead>
        <Tbody>
          {favorites.map((crypto) => (
            <Tr key={crypto.id}>
              <Td>
                <Text fontWeight="bold">{crypto.name}</Text>
                <Text fontWeight="bold" color="gray.500">
                  {crypto.symbol}
                </Text>
              </Td>
              <Td fontWeight="bold">${parseFloat(crypto.priceUsd).toLocaleString()}</Td>
              <Td fontWeight="bold">
                <Text color={parseFloat(crypto.changePercent24Hr) >= 0 ? "green.400" : "red.400"}>{parseFloat(crypto.changePercent24Hr).toFixed(2)}%</Text>
              </Td>
              <Td fontWeight="bold">${parseFloat(crypto.marketCapUsd).toLocaleString()}</Td>
              <Td fontWeight="bold">${parseFloat(crypto.volumeUsd24Hr).toLocaleString()}</Td>
              <Td fontWeight="bold">{parseFloat(crypto.supply).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default FavoritesTable;
