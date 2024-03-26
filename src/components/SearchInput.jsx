import React from "react";
import { InputGroup, InputLeftElement, Icon, Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ searchQuery, setSearchQuery }) => {
  return (
    <InputGroup mr={4} width="200px">
      <InputLeftElement pointerEvents="none">
        <Icon as={FaSearch} color="gray.400" />
      </InputLeftElement>
      <Input type="search" placeholder="Search..." bg="gray.100" size="sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
    </InputGroup>
  );
};

export default SearchInput;
