import { useState } from "react";
import { cryptoData } from "../data/cryptoData";
import Header from "../components/layout/Header";
import React from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCryptoData = cryptoData.filter((crypto) => crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) || crypto.shortName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {}
    </>
  );
};

export default Index;
