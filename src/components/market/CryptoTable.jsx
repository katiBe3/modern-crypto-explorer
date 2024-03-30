import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Icon, useBreakpointValue } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
// Removed the import for react-chartjs-2

// Replaced CryptoChart with a simple SVG mockup for visualization
const CryptoChart = ({ color }) => {
  return (
    <svg width="100" height="30" viewBox="0 0 100 30">
      <polyline fill="none" stroke={color} strokeWidth="2" points="0,20 20,10 40,15 60,10 80,20 100,10" />
    </svg>
  );
};

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
      <Table variant="simple" size={isMobile ? "sm" : "md"}>
        <Thead>
          <Tr>
            <Th px={isMobile ? 1 : 4}></Th>
            <Th px={isMobile ? 1 : 4}>Name</Th>
            <Th px={isMobile ? 1 : 4} onClick={() => handleSort("priceUsd")}>
              Price {sortConfig.key === "priceUsd" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </Th>
            <Th px={isMobile ? 1 : 4} onClick={() => handleSort("changePercent24Hr")}>
              24h% {sortConfig.key === "changePercent24Hr" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </Th>
            {!isMobile && (
              <Th px={4} onClick={() => handleSort("marketCapUsd")}>
                Market Cap {sortConfig.key === "marketCapUsd" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </Th>
            )}
            {!isMobile && (
              <Th px={4} onClick={() => handleSort("volumeUsd24Hr")}>
                Volume (24h) {sortConfig.key === "volumeUsd24Hr" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </Th>
            )}
            {!isMobile && (
              <Th px={4} onClick={() => handleSort("supply")}>
                Circulating Supply {sortConfig.key === "supply" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </Th>
            )}
            {!isMobile && (
              <Th colSpan={8} textAlign="right" px={isMobile ? 1 : 4}>
                30m
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {sortedData.map((crypto) => (
            <Tr key={crypto.id}>
              <Td px={isMobile ? 1 : 4}>
                <Icon as={FaHeart} color={crypto.isFavorite ? "red.500" : "gray.200"} onClick={() => toggleFavorite(crypto.id)} _hover={{ color: "red.400", cursor: "pointer" }} />
              </Td>
              <Td px={isMobile ? 1 : 4}>
                <Text fontSize={isMobile ? "sm" : "md"} fontWeight="bold">
                  {crypto.name}
                </Text>
                <Text fontSize={isMobile ? "xs" : "sm"} fontWeight="bold" color="gray.500">
                  {crypto.symbol}
                </Text>
              </Td>
              <Td px={isMobile ? 1 : 4} fontWeight="bold">
                <Text fontSize={isMobile ? "sm" : "md"} color={priceColors[crypto.id]}>
                  ${parseFloat(crypto.priceUsd).toLocaleString()}
                </Text>
              </Td>
              <Td px={isMobile ? 1 : 4} fontWeight="bold">
                <Text fontSize={isMobile ? "sm" : "md"} color={parseFloat(crypto.changePercent24Hr) >= 0 ? "green.400" : "red.400"}>
                  {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
                </Text>
              </Td>
              {!isMobile && (
                <Td px={4} fontWeight="bold">
                  ${parseFloat(crypto.marketCapUsd).toLocaleString()}
                </Td>
              )}
              {!isMobile && (
                <Td px={4} fontWeight="bold">
                  ${parseFloat(crypto.volumeUsd24Hr).toLocaleString()}
                </Td>
              )}
              {!isMobile && (
                <Td px={4} fontWeight="bold">
                  {parseFloat(crypto.supply).toLocaleString()}
                </Td>
              )}
              {!isMobile && (
                <Td px={4} fontWeight="bold">
                  <Box width="50px" height="30px">
                    <CryptoChart color={parseFloat(crypto.changePercent24Hr) >= 0 ? "green.400" : "red.400"} />
                  </Box>
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
