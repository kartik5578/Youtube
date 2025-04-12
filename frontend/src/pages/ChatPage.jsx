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
  const [videosList, setVideos] = useState([]);
  const [contractaddress, setContractAddress] = useState();

  const updateView = async (video) => {
    console.log(`Updating views for: ${video.url}`);

    const tx = await contractaddress.updateViews(2000);
    await tx.wait();
  };

  // Function to withdraw if duration exceeded
  const withdraw = (video) => {
    console.log(`Withdrawing for: ${video.url}`);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setVideos((prevVideos) =>
        prevVideos.map((video) => {
          if (!video.active) return video; 

          updateView(video); 

          const currentTime = new Date().getTime();
          console.log(currentTime)
          if (currentTime < video.duration) {
            withdraw(video);
            return { ...video, active: false }; 
          }

          return video;
        })
      );
    }, 5*60* 1000); 

    return () => clearInterval(interval);
  }, []);
  

  return (
    <div style={{width: "100%"}}>
        {user && <SideDrawer/>}
        <Box >
            <Flex  justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
            {user && <MyChats fetchAgain={fetchAgain}  />}
            {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} setContractAddress={setContractAddress} setVideos={setVideos} />}
            </Flex>     
           
        </Box>
    </div>

  )
}

export default ChatPage