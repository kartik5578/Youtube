import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, Button, effect, flexbox, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../../Config/Chatlogics';
import ProfileModal from './ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client'
import Lottie from 'react-lottie'
import animationData from "../../animations/typing.json"
import ContractFormModal from './ContractFormModal';

const ENDPOINT = "http://localhost:5000";
var socket,selectedChatCompare;

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderSettings:{
        preserveAspectRatio: "xMidYMid slice"
    }
}

function SingleChat({fetchAgain,setFetchAgain}) {

    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit('setup', user)
        socket.on('connected', ()=> setSocketConnected(true))
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", ()=> setIsTyping(false))
    }, [])

    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [socketConnectd, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false)

    const {user, selectedChat, setSelectedChat, notification, setNotification} = ChatState();
    const toast = useToast();

    const fetchMessage = async () =>{
        if(!selectedChat) return;

        try {
            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`,
                }
            }

            const {data} = await axios.get(`/api/message/${selectedChat._id}`, config);

            setMessage(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id)

        } catch (error) {
             toast({
                    position: "top",
                    title:"Error Occured",
                    status:"error",
                    description: "Failed to Load the Message",
                    isClosable: true,
                    duration: 5000
                })
        }
    }

    useEffect(()=>{
        fetchMessage();
        selectedChatCompare = selectedChat
    },[selectedChat])

    console.log(notification);

    useEffect(()=>{
        socket.on("message recived", (newMessageRecieved)=>{
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id ){
                if(!notification.includes(newMessageRecieved)){
                    setNotification([newMessageRecieved, ...notification])
                    setFetchAgain(!fetchAgain)
                }
            }else{
                setMessage([...message, newMessageRecieved])
            }
        })
    })

    const sendMessage = async (e) =>{
        if(e.key === "Enter" && newMessage){
            socket.emit("stop typing", selectedChat._id)
            try {
                
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    },
                }

                setNewMessage("");
                const {data} = await axios.post('/api/message', {
                    content: newMessage,
                    chatId: selectedChat._id
                }, config);

                console.log(data)

                socket.emit("new message", data)
                setMessage([...message, data])
            } catch (error) {
                toast({
                    position: "top",
                    title:"Error Sending Message",
                    status:"error",
                    description: error.message,
                    isClosable: true,
                    duration: 5000
                })
            }
        }
    }

  

    const typingHandler = (e)=>{
        setNewMessage(e.target.value);

        if(!socketConnectd) return;

        if(!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }

        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() =>{
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;

            if(timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength)
    }

  return (
    <>
    {selectedChat ? (<>
    <Text
    fontSize={{base: "28px", md: "30px"}}
    pb={3}
    px={2}
    w={'100%'}
    display={'flex'}
    justifyContent={{base: "space-between"}}
    alignItems={'center'}
    >
        <IconButton display={{base: "flex", md: "none"}}
        icon={<ArrowBackIcon/>}
        onClick={() => setSelectedChat("")}
    />
    {!selectedChat.isGroupedChat ? (<>
    {getSender(user, selectedChat.users)}
    <ProfileModal user={getSenderFull(user, selectedChat.users)}/>
    </>
    ) : (
    <>
    {selectedChat.chatName.toUpperCase()}
    <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessage={fetchMessage} />
    </>
    )}
    </Text>

        <Box
        display={'flex'}
        flexDir={'column'}
        justifyContent={'flex-end'}
        p={3}
        bg={'#E8E8E8'}
        w={'100%'}
        h={"100%"}
        borderRadius={'lg'}
        overflow={'hidden'}
        >
            {loading ? <Spinner size={'xl'}
            w={20}
            h={20}
            alignSelf={'center'}
            margin={'auto'}
            /> : <div className='message' >
                <ScrollableChat message={message} />
                </div>}


            

            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
           
            {isTyping?<div>
                <Lottie
                 options={defaultOptions}
                 width={70}
                 style={{marginBottom: 15, marginLeft: 0}}
                />
            </div>:<></>}

            <Box display={'flex'} gap={3}>
            
            <ContractFormModal children={ <Button px={10} backgroundColor={'green'} textColor={'white'} _hover={{ bg: "blue.500" }}>
                Make Ad Contract</Button>  }>

            </ContractFormModal>
           
            <Input 
                variant={'filled'}  
                background={"#E0E0E0"}
                placeholder='Enter a message..'
                onChange={typingHandler}
                value={newMessage}
                />
            </Box>
                
            </FormControl>
        </Box>

    </>) : (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} h={'100%'}>
            <Text fontSize={'2xl'} pb={3}>
                Click on user to start Chatting
            </Text>
        </Box>
    )}
    </>
  )
}

export default SingleChat