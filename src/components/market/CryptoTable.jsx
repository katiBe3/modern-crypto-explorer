import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Icon } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const CryptoTable = ({ assets }) => {
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "marketCapUsd", direction: "desc" });
  const [priceColors, setPriceColors] = useState({});
  const [previousPrices, setPreviousPrices] = useState({});
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    if (assets) {
      const newPriceColors = {};
      const newPreviousPrices = {};

      assets.forEach(asset => {
        const previousPrice = previousPrices[asset.id];
        const currentPrice = parseFloat(asset.priceUsd);
        newPreviousPrices[asset.id] = currentPrice;

        if (previousPrice !== undefined && previousPrice !== currentPrice) {
          newPriceColors[asset.id] = currentPrice > previousPrice ? "green.400" : "red.400";
        }
      });

      setPriceColors(newPriceColors);
      setPreviousPrices(newPreviousPrices);

      const colorResetTimer = setTimeout(() => {
        setPriceColors({});
      }, 500);

      return () => clearTimeout(colorResetTimer);
    }
  }, [assets]); // Remove previousPrices from dependencies

  useEffect(() => {
    if (assets) {
      const mergedData = assets.map(asset => ({
        ...asset,
        isFavorite: favorites[asset.id] || false,
      }));
      setTableData(mergedData);
    }
  }, [assets, favorites]);

  const toggleFavorite = id => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  return (
    <Box overflowX="auto" maxWidth="1200px" mt={8} mx="auto">
      <Table variant="simple">
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
          {tableData.map(crypto => (
            <Tr key={crypto.id}>
              <Td>
                <Icon as={FaHeart} color={crypto.isFavorite ? "red.500" : "gray.200"} onClick={() => toggleFavorite(crypto.id)} _hover={{ color: "red.400", cursor: "pointer" }} />
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
