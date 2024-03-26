import React, { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Button, Icon } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const CryptoTable = ({ cryptoData }) => {
  const [tableData, setTableData] = useState(cryptoData);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  useEffect(() => {
    setTableData(cryptoData);
  }, [cryptoData]);

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
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const sortData = () => {
      const newCryptoData = [...tableData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setTableData(newCryptoData);
    };

    sortData();
  }, [sortConfig, tableData]);

  return (
    <Box overflowX="auto" maxWidth="1200px">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th><Button onClick={() => requestSort('name')} variant="link">Name</Button></Th>
            <Th><Button onClick={() => requestSort('price')} variant="link">Price</Button></Th>
            <Th><Button onClick={() => requestSort('percentChange1h')} variant="link">1h%</Button></Th>
            <Th><Button onClick={() => requestSort('percentChange24h')} variant="link">24h%</Button></Th>
            <Th><Button onClick={() => requestSort('percentChange7d')} variant="link">7d%</Button></Th>
            <Th><Button onClick={() => requestSort('marketCap')} variant="link">Market Cap</Button></Th>
            <Th><Button onClick={() => requestSort('volume24h')} variant="link">Volume (24h)</Button></Th>
            <Th><Button onClick={() => requestSort('circulatingSupply')} variant="link">Circulating Supply</Button></Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((crypto) => (
            <Tr key={crypto.name}>
              <Td>
                <Icon as={FaStar} color={crypto.isFavorite ? "yellow.500" : "gray.300"} onClick={() => toggleFavorite(crypto.name)} _hover={{ cursor: "pointer" }} />
              </Td>
              <Td><Text fontWeight="bold">{crypto.name}</Text><Text fontWeight="bold" color="gray.500">{crypto.shortName}</Text></Td>
              <Td fontWeight="bold">${crypto.price.toLocaleString()}</Td>
              <Td fontWeight="bold"><Text color={crypto.percentChange1h >= 0 ? "green.400" : "red.400"}>{crypto.percentChange1h}%</Text></Td>
              <Td fontWeight="bold"><Text color={crypto.percentChange24h >= 0 ? "green.400" : "red.400"}>{crypto.percentChange24h}%</Text></Td>
              <Td fontWeight="bold"><Text color={crypto.percentChange7d >= 0 ? "green.400" : "red.400"}>{crypto.percentChange7d}%</Text></Td>
              <Td fontWeight="bold">${crypto.marketCap.toLocaleString()}</Td>
              <Td fontWeight="bold">${crypto.volume24h.toLocaleString()}</Td>
              <Td fontWeight="bold">{crypto.circulatingSupply.toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CryptoTable;
