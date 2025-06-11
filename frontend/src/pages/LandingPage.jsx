import React from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  HStack,
  Image,
  IconButton,
  Spacer,
  Link,
} from "@chakra-ui/react";
import MonkeyImage from '../components/assets/Monkey-mage.png';


const KoalaLandingPage = () => {
  return (
    <Box  minH="100vh" bg="#0C1A11" color="white"  px={8} py={6}>


      {/* Main Content */}
      <Flex align="center" justify="space-around" pt={12} direction={{ base: "column", md: "row" }}>
        {/* Left Section */}
        <VStack align="start" spacing={6} maxW="lg">
          <Heading as="h1" size="3xl" lineHeight="short">
            YOUTUBE <Text as="span" color="green.400">CREATORS</Text> AGENCY
          </Heading>
          <Text fontSize="md" color="gray.300">
           Find  the creators that best suits your company without need to pay
        much with ease of few clicks.
          </Text>
          <Box
            borderRadius="full"
            border="1px solid"
            borderColor="green.400"
            px={6}
            py={2}
            fontWeight="bold"
            cursor="pointer"
            transition="all 0.3s ease"
            _hover={{ bg: "green.400", color: "black" }}
          >
            Find Creators
          </Box>
        </VStack>

        {/* Right Section */}
        <Box position="relative" mt={{ base: 10, md: 0 }}>
          <Image
            src={MonkeyImage}// replace with actual path
            alt="Koala Character"
            boxSize="400px"
            borderRadius="full"
            objectFit="cover"
          />
         
        </Box>
      </Flex>
    </Box>
  );
};

export default KoalaLandingPage;
