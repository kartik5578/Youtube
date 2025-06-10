import { Box, Button, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from 'react'
import ProfileImage from '../components/assets/Monkey-mage.png';
import { useParams } from 'react-router-dom';

function YoutuberInfo() {
   const { handle } = useParams();
   console.log(handle)

  // Optional fallback
  if (!handle) {
    return (
      <Box color="white" p={10}>
        <Text>No data received. Please go back and select a channel card.</Text>
      </Box>
    );
  }

  


    return (
        <Box backgroundColor={"#0C1A11"} color="white" minH="100vh" px={20} py={10}>
         
          {/* Profile Section */}
          <Flex direction={{ base: "column", md: "row" }} align="center" gap={10}>
            <Image
              src={ProfileImage}
              alt="Channel Avatar"
              borderRadius="full"
              width={{ base: "80%", md: "20%" }}
            />
            <Stack spacing={2}>
              <Text fontWeight="bold" color={"yellowgreen"}>
                NAME: <span style={{ fontWeight: "normal" }}>{handle}</span>
              </Text>
              <Text fontWeight="bold" color={"yellowgreen"}>
                CHANNEL ID: <span style={{ fontWeight: "normal" }}>{handle}</span>
              </Text>
              <Text fontWeight="bold" color={"yellowgreen"}>
                NICHE: <span style={{ fontWeight: "normal" }}>Entertainment</span>
              </Text>
              <Text fontWeight="bold" h={150} textAlign={"justify"} color={"yellowgreen"}>
                {/* DESCRIPTION: <span style={{ fontWeight: "normal" }} color="whiteAlpha.200" >{description}</span> */}
              </Text>
              <Box mt={10} display={"flex"} gap={30}>
              <Button colorScheme="green" w="120px">
                Chat
              </Button>
              <Button colorScheme="green" w="150px">
                Visit Channel
              </Button>
              </Box>
              
            </Stack>
          </Flex>
    
          {/* Stats Section */}
          <Flex justify="space-between" textAlign="center" mt={10} gap={6} px={40}>
            <Box>
              <Text fontWeight="bold" color={"yellowgreen"}>TOTAL SUBSCRIBERS</Text>
              {/* <Text fontSize="xl">{subscribers}</Text> */}
            </Box>
            <Box>
              <Text fontWeight="bold" color={"yellowgreen"}>TOTAL VIEWS</Text>
              {/* <Text fontSize="xl">{averageViews}</Text> */}
            </Box>
            <Box>
              <Text fontWeight="bold" color={"yellowgreen"}>TOTAL VIDEOS</Text>
              <Text fontSize="xl">43</Text>
            </Box>
            <Box>
              <Text fontWeight="bold" color={"yellowgreen"}>AVERAGE VIEWS</Text>
              {/* <Text fontSize="xl">{averageViews}</Text> */}
            </Box>
          </Flex>
    
          {/* Videos Section */}
          <Text fontWeight="bold" mt={10}>
            VIDEOS:
          </Text>
          <Flex gap={6} wrap="wrap">
        <Box
          as="iframe"
          width="300px"
          height="170px"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          allowFullScreen
          borderRadius="md"
        />
        <Box
          as="iframe"
          width="300px"
          height="170px"
          src="https://www.youtube.com/embed/3JZ_D3ELwOQ"
          allowFullScreen
          borderRadius="md"
        />
        <Box
          as="iframe"
          width="300px"
          height="170px"
          src="https://www.youtube.com/embed/tgbNymZ7vqY"
          allowFullScreen
          borderRadius="md"
        />

        <Box
          as="iframe"
          width="300px"
          height="170px"
          src="https://www.youtube.com/embed/tgbNymZ7vqY"
          allowFullScreen
          borderRadius="md"
        />
      </Flex>
        </Box>
      );
}

export default YoutuberInfo