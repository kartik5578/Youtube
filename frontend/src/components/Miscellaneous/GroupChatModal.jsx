import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Box,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useToast,
    FormControl,
    Input,
  } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from "../User Avatar/UserListItem"
import UserBadgeItem from '../User Avatar/UserBadgeItem';

function GroupChatModal({children}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const[groupchatname, setGroupChatName] = useState();
    const[selectedUsers, setSelectedUsers] = useState([]);
    const[search,setSearch] = useState("")
    const[searchResult, setSearchResult] = useState([]);
    const[loading, setLoading] = useState(false)

    const toast = useToast();

    const handleGroup = (userToAdd) =>{

      if(selectedUsers.includes(userToAdd)){
        toast({
          position: "top",
         title:"User Already added",
          isClosable: true,
          duration: 5000,
          status:"warning"
      })
      return
      }

      setSelectedUsers([...selectedUsers, userToAdd])
    }

    const {user, chats, setChats} = ChatState();

    const handleDelete = (delUser) =>{
      setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id))
    }

    const handleSearch = async (query) =>{
        setSearch(query)
        if(!query){
            return
        }

        try{

            setLoading(true);
            const config ={
                headers : {
                    Authorization: `Bearer ${user.token}`
                }
            }
            
            const {data} = await axios.get(`/api/user?search=${search}`, config)
            console.log(data);
            setLoading(false);
            setSearchResult(data)
        }catch(err){
            toast({
                position: "top",
                description: err.message,
                isClosable: true,
                duration: 5000,
                status:"error"
            })
        }
    }

    const handleSubmit = async () =>{
   
      if(!groupchatname || !selectedUsers){
        toast({
          position: "top",
         title:"Please fill all the fields",
          isClosable: true,
          duration: 5000,
          status:"error"
      })
      return
    }
    try {
      const config ={
        headers : {
            Authorization: `Bearer ${user.token}`
        }
      }

      const {data} = await axios.post('/api/chat/group', {
        name: groupchatname,
        users: JSON.stringify(selectedUsers.map((u) => u._id))
      }, config)

      setChats([data, ...chats])
      onClose()

      toast({
        position: "top",
       title:"New Group Chat Created",
        isClosable: true,
        duration: 5000,
        status:"success"
    })
    } catch (error) {
      toast({
        position: "top",
       title:"Error while Creating Group",
        isClosable: true,
        duration: 5000,
        status:"error"
    })
    return
    }
  }

    return (
        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize={'35px'} display={'flex'} justifyContent={'center'}>Create Group Chat</ModalHeader>
              <ModalCloseButton />
              <ModalBody display={'flex'} 
              flexDir={'column'}
              alignItems={'center'}
              >
                <FormControl>
                    <Input placeholder='Chat Name' mb={3} onChange={(e)=> setGroupChatName(e.target.value)} />
                </FormControl>
                <FormControl>
                    <Input placeholder='Add Users' mb={1} onChange={(e)=> handleSearch(e.target.value)} />
                </FormControl>

              <Box w="100%" display="flex" >
                {selectedUsers.map((u) => (
                  <UserBadgeItem key={u._id} user={u}
                  handleFunction={()=>handleDelete(u)} />
                ))}
                </Box>
                {loading?<div>loading</div>:(
                    searchResult?.slice(0,4).map((user) =><UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />)
                )}


              </ModalBody>
    
              <ModalFooter>
                <Button  colorScheme='green' mr={1} onClick={handleSubmit}>
                  Create Chat
                </Button>

              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModal