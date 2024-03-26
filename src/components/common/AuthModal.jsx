import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";

const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState(initialMode);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      onClose();
      toast({
        title: mode === "login" ? "Logged in successfully" : "Account created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{mode === "login" ? "Login" : "Sign Up"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="purple" mr={4}>
              {mode === "login" ? "Login" : "Sign Up"}
            </Button>
            <Button variant="link" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
              {mode === "login" ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
