import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Button, Icon, Spinner } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const CryptoTable = ({ assetsData, loading }) => {
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "ascending" });

  useEffect(() => {
    setTableData(assetsData);
  }, [assetsData]);
  const toggleFavorite = (name) => {
    const updatedData = tableData.map((crypto) => {
      if (crypto.name === name) {
        return { ...crypto, isFavorite: !crypto.isFavorite };
      }
      return crypto;
    });
    setTableData(updatedData);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else {
      direction = "ascending";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const sortData = () => {
      const newCryptoData = [...tableData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      setTableData(newCryptoData);
    };

    sortData();
  }, [sortConfig, tableData]);

  return (
    <Box overflowX="auto" maxWidth="1200px">
      {loading ? (
        <Spinner />
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>
                <Button onClick={() => requestSort("name")} variant="link">
                  Name
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("priceUsd")} variant="link">
                  Price
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("changePercent24Hr")} variant="link">
                  24h%
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("marketCapUsd")} variant="link">
                  Market Cap
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("volumeUsd24Hr")} variant="link">
                  Volume (24h)
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("supply")} variant="link">
                  Circulating Supply
                </Button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((crypto) => (
              <Tr key={crypto.id}>
                <Td>
                  <Icon as={FaStar} color={crypto.isFavorite ? "yellow.500" : "gray.300"} onClick={() => toggleFavorite(crypto.id)} _hover={{ cursor: "pointer" }} />
                </Td>
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
      )}
    </Box>
  );
};

export default CryptoTable;
