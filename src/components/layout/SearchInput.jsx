import React, { useState, useEffect, useMemo } from "react";
import { Input, Box } from "@chakra-ui/react";

const SearchInput = ({ assets, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);
    setDebounceTimeout(timeout);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm, onSearch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAssets = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return assets.filter((asset) => asset.name.toLowerCase().includes(lowerCaseSearchTerm) || asset.symbol.toLowerCase().includes(lowerCaseSearchTerm));
  }, [assets, searchTerm]);

  return (
    <Box>
      <Input onChange={handleSearchChange} placeholder="Search by name or symbol..." size="md" />
      {}
    </Box>
  );
};

export default SearchInput;
