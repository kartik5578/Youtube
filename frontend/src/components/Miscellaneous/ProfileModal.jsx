import { ViewIcon } from '@chakra-ui/icons'
import { Button, IconButton, Image, Text, useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import React from 'react'

function ProfileModal({user, childern}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>{
        childern?  <span onClick={onOpen}>{childern}</span>    :( 
        <IconButton 
            display={{base:"flex"}} 
            icon={<ViewIcon/>}
             onClick={onOpen}
             /> ) 
            }
             <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="370px">
          <ModalHeader
          fontSize="40px"
          display="flex"
          justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="full" display="flex" flexDir="column" alignItems="center" justifyContent="space-between" >
          <Image borderRadius="full"  objectFit='cover' src={user.pic}  boxSize="150px" alt={user.name}  />
          <Text>{user.email}</Text>
          </ModalBody>
               
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
  )
}

export default ProfileModal