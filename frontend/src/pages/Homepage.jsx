import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useHistory } from 'react-router-dom'

function Homepage() {
 
  const history = useHistory();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user) history.push("/chats")
  })

  return (
    <Box bg="#0C1A11">
    <Container maxW="xl" centerContent >
        <Box d="flex" justifyContent="centerContent">
            <Text fontSize="4xl"  fontFamily="IBM Plex Mono" fontWeight="Bold">Connect With Creatores<span color='white'>.</span></Text>
        </Box>
        <Box w="100%" p={4} borderRadius='lg' borderWidth="1px">
        <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <Tab>Sign Up</Tab>
    <Tab>Log In</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <Signup/>
    </TabPanel>
    <TabPanel>
    <Login/>
    </TabPanel>
  </TabPanels>
</Tabs>
        </Box>
    </Container>

    </Box>
  )
}

export default Homepage