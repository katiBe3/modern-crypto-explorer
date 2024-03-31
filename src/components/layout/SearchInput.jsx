import React, { useState } from "react";
import { InputGroup, InputLeftElement, Icon, Input, List, ListItem } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ assets }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() !== "") {
      const filteredAssets = assets.filter((asset) => asset.name.toLowerCase().includes(query.toLowerCase()));
      setSuggestions(filteredAssets);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (assetId) => {
    setSearchQuery("");
    setSuggestions([]);
    // Perform navigation here if needed
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0].id);
    }
  };

  return (
    <InputGroup mr={4} width="200px">
      <InputLeftElement pointerEvents="none">
        <Icon as={FaSearch} color="gray.400" />
      </InputLeftElement>
      <Input type="search" placeholder="Search..." bg="gray.100" size="sm" value={searchQuery} onChange={handleInputChange} onKeyPress={handleKeyPress} />
      {suggestions.length > 0 && (
        <List position="absolute" top="100%" left={0} right={0} bg="white" borderWidth={1} borderColor="gray.200" zIndex={10}>
          {suggestions.map((asset) => (
            <ListItem key={asset.id} px={4} py={2} _hover={{ bg: "gray.100", cursor: "pointer" }} onClick={() => window.location.href = `/crypto/${asset.id}`}>
              {asset.name}
            </ListItem>
          ))}
        </List>
      )}
    </InputGroup>
  );
};

export default SearchInput;
