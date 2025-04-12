import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SingleChat from './SingleChat';

function ChatBox({fetchAgain,setFetchAgain, setContractAddress, setVideos}) {
  const {selectedChat} = ChatState();
  return (
    <Box 
    display={{base: selectedChat ? "flex" : "none", md:'flex'}}
    alignItems={'center'}
    p={3}
    flexDir={'column'}
    bg={'white'}
    w={{base: "100%", md: "68%"}}
    borderRadius={'lg'}
    borderWidth={'1px'}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} setContractAddress={setContractAddress} setVideos={setVideos} />
    </Box>
  )
}

export default ChatBox