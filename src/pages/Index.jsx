import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import AuthPopup from "../components/AuthPopup";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Login / Sign Up
      </Button>
      <AuthPopup isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Index;
