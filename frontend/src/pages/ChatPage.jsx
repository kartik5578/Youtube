import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ChatState } from '../Context/ChatProvider';
import { Box, Flex } from '@chakra-ui/react';
import SideDrawer from '../components/Miscellaneous/SideDrawer';
import MyChats from '../components/Miscellaneous/MyChats';
import ChatBox from '../components/Miscellaneous/ChatBox';

function ChatPage() {

   const{user} = ChatState()
   const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{width: "100%"}}>
        {user && <SideDrawer/>}
        <Box >
            <Flex  justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
            {user && <MyChats fetchAgain={fetchAgain}  />}
            {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Flex>     
           
        </Box>
    </div>

  )
}

export default ChatPage