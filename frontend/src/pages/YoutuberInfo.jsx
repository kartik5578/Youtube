import { Box, Button, Flex, Image, Spinner, Stack, Text, Toast } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import ProfileImage from '../components/assets/Monkey-mage.png';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { ChatState } from '../Context/ChatProvider';
import axios from 'axios';


function YoutuberInfo() {
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const history = useHistory();
  const { handle } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startingChat, setStartingChat] = useState(false);


  useEffect(() => {
    if (!handle || handle === "20") {
      setLoading(false);
      return;
    }
    getCreatorInfo();
  }, [handle]);

  const getCreatorInfo = async () => {
    const url = `http://localhost:5000/api/v1/creator/getcreatorusingHandle/${handle}`;
    try {
      const gethash = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NWFiY2RlIiwiZW1haWwiOiJqb2huZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQ5NjEzOTE2LCJleHAiOjE3NDk2MTc1MTZ9.Tms1Un3MDktiYFJ3wBFU-ERBkpIQmJm1z3aDczuG4LM",
        },
      });

      const result = await gethash.json();
      if (!gethash.ok) {
        throw new Error(result.message || "Something went wrong.");
      }
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  // const { chatuser } = await axios.get(`/api/user?search=${handle}`, config);
   const { data } = await axios.get(`/api/user?search=Abhi`, config);
  console.log(data)
  return data[0]?._id; // assuming usernames are unique
};


const createChat = async () => {
  const userId = await handleSearch(); // Step 2

  if (!userId) {
    Toast({
      title: "User not found",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  const { data } = await axios.post("/api/chat", { userId }, config);
  console.log(data)
  setSelectedChat(data);
};



  if (loading) {
    return (
      <Flex bg="#0C1A11" minH="100vh" align="center" justify="center" color="white">
        <Spinner size="xl" thickness="4px" color="green.300" />
      </Flex>
    );
  }

  if (!handle || handle === "20") {
    return (
      <Box backgroundColor="#0C1A11" color="white" minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Text fontSize="xl" color="gray.300">No creator selected or default profile loaded.</Text>
      </Box>
    );
  }

  return (
    <Box backgroundColor="#0C1A11" color="white" minH="100vh" px={20} py={10}>
      {/* Profile Section */}
      <Flex direction={{ base: "column", md: "row" }} align="center" gap={10}>
        <Image
          src={data?.photo || ProfileImage}
          alt="Channel Avatar"
          borderRadius="full"
          width={{ base: "80%", md: "20%" }}
        />
        <Stack spacing={2}>
          <Text fontWeight="bold" color="yellowgreen">
            NAME: <span style={{ fontWeight: "normal" }}>{data?.username}</span>
          </Text>
          <Text fontWeight="bold" color="yellowgreen">
            CHANNEL ID: <span style={{ fontWeight: "normal" }}>{handle}</span>
          </Text>
          <Text fontWeight="bold" color="yellowgreen">
            NICHE: <span style={{ fontWeight: "normal" }}>Entertainment</span>
          </Text>
          <Text fontWeight="bold" h={150} textAlign="justify" color="yellowgreen">
            DESCRIPTION: <span style={{ fontWeight: "normal", color: "#E0E0E0" }}>{data?.description}</span>
          </Text>
          <Box mt={10} display="flex" gap={6}>
           <Link to="/chats" className="">
           <Button isLoading={startingChat}  colorScheme="green" w="120px">
  Chat
</Button>
</Link>


            <Button colorScheme="green" w="150px" as="a" href={`https://www.youtube.com/${handle}`} target="_blank">
              Visit Channel
            </Button>
          </Box>
        </Stack>
      </Flex>

      {/* Stats Section */}
      <Flex justify="space-between" textAlign="center" mt={10} gap={6} px={40}>
        <Box>
          <Text fontWeight="bold" color="yellowgreen">TOTAL SUBSCRIBERS</Text>
          <Text fontSize="xl">{data?.subscribers}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="yellowgreen">TOTAL VIEWS</Text>
          <Text fontSize="xl">{data?.Views}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="yellowgreen">TOTAL VIDEOS</Text>
          <Text fontSize="xl">{data?.videos}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="yellowgreen">AVERAGE VIEWS</Text>
          <Text fontSize="xl">{data?.averageViews}</Text>
        </Box>
      </Flex>

      {/* Videos Section */}
      <Text fontWeight="bold" mt={10}>VIDEOS:</Text>
      <Flex gap={6} wrap="wrap">
        {data?.Video?.map((iframeString, index) => {
          const match = iframeString.match(/src="(.*?)"/);
          const src = match ? match[1] : null;
          return (
            src && (
              <Box
                key={index}
                as="iframe"
                width="300px"
                height="170px"
                src={src}
                allowFullScreen
                borderRadius="md"
              />
            )
          );
        })}
      </Flex>
    </Box>
  );
}

export default YoutuberInfo;
