import React, { useEffect, useState } from 'react'
import { ChakraProvider, Box, Grid, Flex } from '@chakra-ui/react';
import Sidebar from '../components/Helper/SideBar';
import ChannelCard from '../components/Helper/ChannelCard';
  

function ChannelList() {
 const [dummyData, setDummyData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

const getData = async () => {
    const url = "http://localhost:5000/api/v1/creator/getcreators";

    try {
      const gethash = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization':
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NWFiY2RlIiwiZW1haWwiOiJqb2huZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQ5NjEzOTE2LCJleHAiOjE3NDk2MTc1MTZ9.Tms1Un3MDktiYFJ3wBFU-ERBkpIQmJm1z3aDczuG4LM",
        },
        body: JSON.stringify({ forHandle: "@PhysicsWallah" }),
      });

      const data = await gethash.json();
      console.log(data)

      if (!gethash.ok) {
        if (gethash.status === 401) {
          throw new Error("Unauthorized: Please log in again.");
        } else if (gethash.status === 403) {
          throw new Error("Forbidden: You don’t have access.");
        } else {
          throw new Error(data.message || "Something went wrong.");
        }
      }

      // const creatordata = {
      //   username: data.data.username,
      //   description: data.data.description,
      //   subscribers: data.data.subscribers,
      //   averageViews: data.data.averageViews,
      //   videos: data.data.videos,
      //   photo: data.data.photo,
      // };

      setDummyData((prev) => [...data.data]);
      console.log(dummyData)
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  
  
  return (
    <ChakraProvider>
    <Flex direction={{ base: 'column', md: 'row' }} minH="100vh"  bg="#0C1A11" color="white" px={10} pb={10}>
      <Sidebar />
      <Box flex="1" px={10}>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={6}
        >
          {dummyData.map((channel, index) => (
            <ChannelCard key={index} {...channel}/>
          ))}
        </Grid>
      </Box>
    </Flex>
  </ChakraProvider>
  )
}

export default ChannelList