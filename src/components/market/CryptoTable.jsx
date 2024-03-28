import React, { useState, useEffect, useContext } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Icon } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { DataContext } from "../../contexts/DataContext";

const CryptoTable = ({ showFavoritesOnly = false }) => {
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "marketCapUsd", direction: "desc" });
  const [priceColors, setPriceColors] = useState({});
  const [previousPrices, setPreviousPrices] = useState({});
  const { assets, favorites, setFavorites } = useContext(DataContext);

  useEffect(() => {
    if (assets) {
      const newPriceColors = {};
      const newPreviousPrices = {};

      assets.forEach((asset) => {
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
      const mergedData = assets.map((asset) => {
        const isFavorite = favorites[asset.id] === true;
        return {
          ...asset,
          isFavorite,
        };
      });
      setTableData(mergedData);
    }
  }, [assets, favorites]);

  const filteredData = React.useMemo(() => {
    if (showFavoritesOnly) {
      return tableData.filter((asset) => favorites[asset.id]);
    }
    return tableData;
  }, [tableData, favorites, showFavoritesOnly]);

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) {
      return filteredData;
    }

    return [...filteredData].sort((a, b) => {
      const valueA = parseFloat(a[sortConfig.key]);
      const valueB = parseFloat(b[sortConfig.key]);

      if (sortConfig.direction === "asc") {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });
  }, [filteredData, sortConfig]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
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
            <Th onClick={() => handleSort("priceUsd")}>Price {sortConfig.key === "priceUsd" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</Th>
            <Th onClick={() => handleSort("changePercent24Hr")}>24h% {sortConfig.key === "changePercent24Hr" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</Th>
            <Th onClick={() => handleSort("marketCapUsd")}>Market Cap {sortConfig.key === "marketCapUsd" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</Th>
            <Th onClick={() => handleSort("volumeUsd24Hr")}>Volume (24h) {sortConfig.key === "volumeUsd24Hr" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</Th>
            <Th onClick={() => handleSort("supply")}>Circulating Supply {sortConfig.key === "supply" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedData.map((crypto) => (
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
