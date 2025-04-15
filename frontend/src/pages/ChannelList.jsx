import React from 'react'
import { ChakraProvider, Box, Grid, Flex } from '@chakra-ui/react';
import Sidebar from '../components/Helper/SideBar';
import ChannelCard from '../components/Helper/ChannelCard';


const dummyData = Array(12).fill({
    username: '@Mr.Beast',
    niche: 'Entertainment',
    subscribers: '100,000+',
    averageViews: '3M - 10M',
  });
  

function ChannelList() {
  return (
    <ChakraProvider>
    <Flex direction={{ base: 'column', md: 'row' }} minH="100vh"  bg="#0C1A11" color="white" px={10}>
      <Sidebar />
      <Box flex="1" px={10}>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={6}
        >
          {dummyData.map((channel, index) => (
            <ChannelCard key={index} {...channel} />
          ))}
        </Grid>
      </Box>
    </Flex>
  </ChakraProvider>
  )
}

export default ChannelList