import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Button, Icon } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const CryptoTable = ({ assets }) => {
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "marketCapUsd", direction: "desc" });
  const [priceColors, setPriceColors] = useState({});
  const [previousPrices, setPreviousPrices] = useState({});

  useEffect(() => {
    if (assets) {
      const updatedPriceColors = {};
      assets.forEach((asset) => {
        const previousPrice = previousPrices[asset.id];
        const currentPrice = parseFloat(asset.priceUsd);

        if (previousPrice !== undefined && previousPrice !== currentPrice) {
          updatedPriceColors[asset.id] = currentPrice > previousPrice ? "green.400" : "red.400";
        }
      });
      setPriceColors(updatedPriceColors);
      setPreviousPrices(assets.reduce((prices, asset) => ({ ...prices, [asset.id]: parseFloat(asset.priceUsd) }), {}));

      const colorResetTimer = setTimeout(() => {
        setPriceColors({});
      }, 500);

      return () => {
        clearTimeout(colorResetTimer);
      };
    }
  }, [assets, previousPrices]);

  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    if (assets) {
      const mergedData = assets.map((asset) => ({
        ...asset,
        isFavorite: favorites[asset.id] || false,
      }));

      setTableData(mergedData);
    }
  }, [assets, favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  return (
    <Box overflowX="auto" maxWidth="1200px" mt={8} mx="auto" fontSize="md">
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>24h%</Th>
            <Th>Market Cap</Th>
            <Th>Volume (24h)</Th>
            <Th>Circulating Supply</Th>
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
              <Td fontWeight="bold">
                <Text color={priceColors[crypto.id]}>${parseFloat(crypto.priceUsd).toLocaleString()}</Text>
              </Td>
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

export default CryptoTable;
