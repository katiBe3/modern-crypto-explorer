import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Link } from "@chakra-ui/react";
import { exchangeUrls } from "../../../data/ExchangeUrls";

const ExchangeTable = ({ cryptoId }) => {
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${cryptoId}/markets`);
        const data = await response.json();
        setExchanges(data.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching exchanges:", error);
      }
    };

    fetchExchanges();
  }, [cryptoId]);

  return (
    <Box overflowX="auto" maxWidth="100%" mt={8}>
      <Table variant="simple" width="100%">
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>Exchange</Th>
            <Th>% Total Volume</Th>
            <Th>24h Volume (USD)</Th>
          </Tr>
        </Thead>
        <Tbody fontWeight="bold">
          {exchanges.map((exchange, index) => (
            <Tr
              key={exchange.exchangeId}
              _hover={{ bg: "gray.50", cursor: "pointer" }}
              onClick={() => {
                const exchangeUrl = exchangeUrls[exchange.exchangeId.toLowerCase()];
                if (exchangeUrl) {
                  const url = exchangeUrl.replace("{symbol}", cryptoId.toUpperCase()).replace("{target}", "USD");
                  window.open(url, "_blank");
                }
              }}
            >
              <Td>{index + 1}</Td>
              <Td>{exchange.exchangeId}</Td>
              <Td color="green.500">{parseFloat(exchange.volumePercent).toFixed(2)}%</Td>
              <Td>${parseFloat(exchange.volumeUsd24Hr).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ExchangeTable;
