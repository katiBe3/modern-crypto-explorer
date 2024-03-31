import React, { useState, useEffect, useRef } from "react";
import { InputGroup, InputLeftElement, Icon, Input, List, ListItem } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ assets }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const resultListRef = useRef(null);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length >= 2) {
      const lowerCaseQuery = query.toLowerCase();
      const filteredAssets = assets.filter((asset) => asset.name.toLowerCase().includes(lowerCaseQuery) || asset.symbol.toLowerCase().includes(lowerCaseQuery));
      setSuggestions(filteredAssets);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (assetId) => {
    // Perform navigation here if needed
    setSearchQuery("");
    setSuggestions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      window.location.href = `/crypto/${suggestions[0].id}`;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-input") && !resultListRef.current?.contains(e.target)) {
        setSearchQuery("");
        setSuggestions([]);
        setIsFocused(false);
      } else {
        setIsFocused(true);
      }
    };    

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <InputGroup mr={0} width="200px" className="search-input">
      <InputLeftElement pointerEvents="none" verticalAlign="middle">
        <Icon as={FaSearch} color="gray.400" />
      </InputLeftElement>
      <Input
        borderRadius="8px"
        minHeight="38px"
        type="search"
        placeholder="Search..."
        bg="gray.50"
        size="sm"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
      />
      {isFocused && suggestions.length > 0 && (
        <List
          ref={resultListRef}
          className="search-result-list"
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bg="white"
          borderWidth={1}
          borderColor="gray.100"
          zIndex={10}
        >
          {suggestions.map((asset) => (
            <ListItem
              key={asset.id}
              px={4}
              py={2}
              _hover={{ bg: "gray.50", fontWeight: "bold", cursor: "pointer" }}
              onClick={() => window.location.href = `/crypto/${asset.id}`}
            >
              {asset.name}
            </ListItem>
          ))}
        </List>
      )}
    </InputGroup>
  );
};

export default SearchInput;
