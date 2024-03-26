import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
} from '@chakra-ui/react';

const AuthPopup = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>Login / Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack direction="row" spacing={4}>
              <Button colorScheme="blue">Login</Button>
              <Button>Sign Up</Button>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthPopup;