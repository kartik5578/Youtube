import { Box, Button, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from 'react'
import ProfileImage from '../components/assets/Monkey-mage.png';

function YoutuberInfo() {
    return (
        <Box backgroundColor={"#0C1A11"} color="white" minH="100vh" p={20}>
         
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
                NAME: <span style={{ fontWeight: "normal" }}>Entertainment</span>
              </Text>
              <Text fontWeight="bold" color={"yellowgreen"}>
                CHANNEL ID: <span style={{ fontWeight: "normal" }}>XYZ</span>
              </Text>
              <Text fontWeight="bold" color={"yellowgreen"}>
                NICHE: <span style={{ fontWeight: "normal" }}>Entertainment</span>
              </Text>
              <Text fontWeight="bold" h={150} textAlign={"justify"} color={"yellowgreen"}>
                DESCRIPTION: <span style={{ fontWeight: "normal" }} color="whiteAlpha.200" > roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32</span>
              </Text>
              <Box display={"flex"} gap={30}>
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
              <Text fontSize="xl">123456</Text>
            </Box>
            <Box>
              <Text fontWeight="bold" color={"yellowgreen"}>TOTAL VIEWS</Text>
              <Text fontSize="xl">123456</Text>
            </Box>
            <Box>
              <Text fontWeight="bold" color={"yellowgreen"}>TOTAL VIDEOS</Text>
              <Text fontSize="xl">43</Text>
            </Box>
            <Box>
              <Text fontWeight="bold" color={"yellowgreen"}>AVERAGE VIEWS</Text>
              <Text fontSize="xl">234756274</Text>
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