import React, { useState } from 'react'
import { ViewIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, IconButton, Image, Input, Spinner, Text, useDisclosure, useToast } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../User Avatar/UserBadgeItem'
import axios from 'axios'
import UserListItem from '../User Avatar/UserListItem'

function UpdateGroupChatModal({fetchAgain, setFetchAgain, fetchMessage}) {

    const [ groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("")
    const [searchdata, setSearchData] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameLoading, setRenameLoading] = useState(false)

    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const {user, selectedChat, setSelectedChat} = ChatState();

    const handleRemove = async (user1) =>{
        if( selectedChat.groupAdmin._id !== user._id && user1._id === user._id){
            toast({
                title:"Only admins can remove somenone!",
                status:"error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers :{
                    Authorization: `Bearer ${user.token}`,
                }
            };

            const {data} = await axios.put(`api/chat/groupremove`, {
                chatId: selectedChat._id,
                UserId: user1._id
            } ,config)


            user1._id === user._id ? setSelectedChat() : setSelectedChat(data)
            fetchMessage();
            setFetchAgain(!fetchAgain)
            setLoading(false)
            console.log(user1)

        } catch (error) {
            toast({
                title:"Error Occured",
                description: error.response.data.message,
                status:"error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
        }
    }

    const handleRename = async () =>{
        if(!groupChatName) return

        try{
            setRenameLoading(true)

            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`,
                }
            };

            const {data} = await axios.put(`/api/chat/rename`,{
                chatId: selectedChat._id,
                chatName: groupChatName
            }, config)

            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setRenameLoading(false)

        } catch(error){
            toast({
                position:"top",
                title: "Error Renaming Chat",
                description: error.message,
                duration: 5000,
                isClosable: true,
                status: "error"
            })

            setRenameLoading(false)
        }

        setGroupChatName("")
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
            
            const {data} = await axios.get(`/api/user?search=${query}`, config)
            console.log(data);
            setSearchData(data);
            // setSearchResult(data)
            console.log(searchdata);
            setLoading(false);
           
            
        }catch(err){
            toast({
                position: "top",
                description: err.message,
                isClosable: true,
                duration: 5000,
                status:"error"
            })
            setLoading(false)
        }
    }

    const handleAddUser = async (user1) =>{
        if(selectedChat.users.find((u) => u._id === user1._id)){
            toast({
                title:"User Already exits in group",
                status:"error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        if(selectedChat.groupAdmin._id === user1._id){
            toast({
                title:"Only admin can add someone!",
                status:"error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers :{
                    Authorization: `Bearer ${user.token}`,
                }
            };

            const {data} = await axios.put(`api/chat/groupadd`, {
                chatId: selectedChat._id,
                UserId: user1._id
            } ,config)

            setSelectedChat(data);
            setFetchAgain(!fetchAgain)
            setLoading(false)
        } catch (error) {
            toast({
                title:"Error Occured",
                description: error.response.data.message,
                status:"error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
        }


    }

  return (
    <div>
         <IconButton onClick={onOpen} icon={<ViewIcon/>} display={{base: "flex"}} />

<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>{selectedChat.chatName}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Box w={'100%'} display={'flex'} flexWrap={'wrap'} pb={3} > 
        {selectedChat.users.map((u)=>(
              <UserBadgeItem key={u._id} user={u}
              handleFunction={()=>handleRemove(u)} />
        ))}
      </Box>

      <FormControl display={'flex'}>
        <Input 
        placeholder='Chat name'
        mb={3}
        value={groupChatName}
        onChange={(e => setGroupChatName(e.target.value))} />

        <Button
            variant={'solid'}
            colorScheme='teal'
            ml={1}
            isLoading={renameLoading}
            onClick={handleRename}>
                Update
            </Button>
      </FormControl>

      <FormControl display={'flex'}>
        <Input 
        placeholder='Add User to Group'
        mb={1}
        onChange={(e) => handleSearch(e.target.value)} />
      </FormControl>
      {loading ? (
        <Spinner size={'lg'}/>
      ):(
        searchdata?.map((u) =>(
            <UserListItem
            key={u._id}
            user={u}
            handleFunction={()=> handleAddUser(u)}
            />

        ))
      )}
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='red' mr={3} onClick={() => handleRemove(user)}>
       Leave Group
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </div>
  )
}

export default UpdateGroupChatModal