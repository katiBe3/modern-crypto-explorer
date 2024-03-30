import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Icon, useBreakpointValue } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const CryptoTable = ({ assets, showFavoritesOnly = false }) => {
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "marketCapUsd", direction: "desc" });
  const [priceColors, setPriceColors] = useState({});
  const [previousPrices, setPreviousPrices] = useState({});

  const isMobile = useBreakpointValue({ base: true, md: false });

  // Load favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const localData = localStorage.getItem("favorites");
      return localData ? JSON.parse(localData) : {};
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      return {};
    }
  });

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

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

  return (
    <Box overflowX="auto" maxWidth="1200px" mt={8} mx="auto">
      <Table variant="simple" size={useBreakpointValue({ base: "sm", md: "md" })}>
        <Thead>
          <Tr>
            <Th px={{ base: 1, md: 4 }}></Th>
            <Th px={{ base: 1, md: 4 }}>Name</Th>
            <Th px={{ base: 1, md: 4 }} onClick={() => handleSort("priceUsd")}>
              Price {sortConfig.key === "priceUsd" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </Th>
            <Th px={{ base: 1, md: 4 }} onClick={() => handleSort("changePercent24Hr")}>
              24h% {sortConfig.key === "changePercent24Hr" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </Th>
            {useBreakpointValue({ base: false, md: true }) && (
              <Th px={4} onClick={() => handleSort("marketCapUsd")}>
                Market Cap {sortConfig.key === "marketCapUsd" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </Th>
            )}
            {useBreakpointValue({ base: false, md: true }) && (
              <Th px={4} onClick={() => handleSort("volumeUsd24Hr")}>
                Volume (24h) {sortConfig.key === "volumeUsd24Hr" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </Th>
            )}
            {useBreakpointValue({ base: false, md: true }) && (
              <Th px={4} onClick={() => handleSort("supply")}>
                Circulating Supply {sortConfig.key === "supply" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {sortedData.map((crypto) => (
            <Tr key={crypto.id}>
              <Td px={{ base: 1, md: 4 }}>
                <Icon as={FaHeart} color={crypto.isFavorite ? "red.500" : "gray.200"} onClick={() => toggleFavorite(crypto.id)} _hover={{ color: "red.400", cursor: "pointer" }} />
              </Td>
              <Td px={{ base: 1, md: 4 }}>
                <Text fontSize={{ base: "sm", md: "md" }} fontWeight="bold">
                  {crypto.name}
                </Text>
                <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="bold" color="gray.500">
                  {crypto.symbol}
                </Text>
              </Td>
              <Td px={{ base: 1, md: 4 }} fontWeight="bold">
                <Text fontSize={{ base: "sm", md: "md" }} color={priceColors[crypto.id]}>
                  ${parseFloat(crypto.priceUsd).toLocaleString()}
                </Text>
              </Td>
              <Td px={{ base: 1, md: 4 }} fontWeight="bold">
                <Text fontSize={{ base: "sm", md: "md" }} color={parseFloat(crypto.changePercent24Hr) >= 0 ? "green.400" : "red.400"}>
                  {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
                </Text>
              </Td>
              {useBreakpointValue({ base: false, md: true }) && (
                <Td px={4} fontWeight="bold">
                  ${parseFloat(crypto.marketCapUsd).toLocaleString()}
                </Td>
              )}
              {useBreakpointValue({ base: false, md: true }) && (
                <Td px={4} fontWeight="bold">
                  ${parseFloat(crypto.volumeUsd24Hr).toLocaleString()}
                </Td>
              )}
              {useBreakpointValue({ base: false, md: true }) && (
                <Td px={4} fontWeight="bold">
                  {parseFloat(crypto.supply).toLocaleString()}
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CryptoTable;
