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
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaDiscord,
} from "react-icons/fa";

const KoalaLandingPage = () => {
  return (
    <Box  minH="100vh" color="white"  px={8} py={6}>


      {/* Main Content */}
      <Flex align="center" justify="space-around" pt={12} direction={{ base: "column", md: "row" }}>
        {/* Left Section */}
        <VStack align="start" spacing={6} maxW="lg">
          <Heading as="h1" size="3xl" lineHeight="short">
            KOALA <Text as="span" color="green.400">INTELLIGENCE</Text> AGENCY
          </Heading>
          <Text fontSize="md" color="gray.300">
            A collection of 10,000 worldly Koalas each with their unique skillsets.
            Their mission is to protect the world from evil.
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
            EXPLORE ARTWORKS
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
