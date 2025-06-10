import React, { useState } from 'react';
import axios from 'axios';

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
  const [name, setName] = useState('');
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NWFiY2RlIiwiZW1haWwiOiJqb2huZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQ1NzQ4Nzc2LCJleHAiOjE3NDU3NTIzNzZ9.Ts0H9Oaw8XHxPU91-OA9kzXJAY_Ek9Zb69Vv-FyiuYE'
  const handleSubmit = async() => {

    // Submit logic here
    try{
    const payload = {
      forHandle:id
    }
    const url = 'http://localhost:5000/api/v1/youtube/channel_info'
    const res = await axios.post(url,payload,{
      headers: {
        'Authorization': `Bearer ${token}`,   
        'Content-Type': 'application/json'   
      }
    }
    )
    console.log(res.data)
  }
  catch(error){
    console.log('Error sending POST request:', error)
    return;
  }

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
