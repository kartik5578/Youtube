import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
} from '@chakra-ui/react';

function ProfileInfoModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState('');
  

  const handleSubmit = () => {
    // Submit logic here
    onClose();
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}  isCentered>
        <ModalOverlay />
        <ModalContent
          
          bgGradient="linear(to-b,rgba(43, 255, 255, 0.12) 0%, rgba(43, 255, 255, 0.04) 50%, rgba(43, 255, 255, 0.07) 100%)"
          borderRadius="2xl"
          p={6}
          boxShadow="lg"
          color="green.900"
        >
          <ModalHeader fontSize="2xl" fontWeight="bold">
            Add Channel
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel  color="rgba(0,0,0,0.4)">Channel Hanndle</FormLabel>
              <Input
                border="1px solid #00AA66"
                borderRadius="lg"
                placeholder="@PhysicsWallah"
                onChange={(e) => setId(e.target.value)}
              />
            </FormControl>
           
          </ModalBody>

          <ModalFooter>
            <Button
              w="100%"
              bg="#00AA66"
              color="white"
              borderRadius="2xl"
              _hover={{ bg: '#009955' }}
              onClick={handleSubmit}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileInfoModal;
