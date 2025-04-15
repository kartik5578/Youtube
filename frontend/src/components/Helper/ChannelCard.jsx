import React from "react";
import {
  Box,
  Avatar,
  Text,
  Divider,
  VStack,
  Button,
} from "@chakra-ui/react";

const ChannelCard = () => {
  return (
    <Box
      w="250px"

      bgGradient="linear(to-b,rgba(43, 255, 255, 0.12) 0%, rgba(43, 255, 255, 0.04) 50%, rgba(43, 255, 255, 0.07) 100%)"
      _hover={{
        bgImage: `
          linear(to-b, rgba(37, 37, 37, 0.4) 0%, rgba(15, 15, 15, 0.4) 100%),
          linear(to-b, rgba(43, 255, 255, 0.12) 0%, rgba(43, 255, 255, 0.04) 50%, rgba(43, 255, 255, 0.07) 100%)
        `,
        bgSize: "cover",
        bgPosition: "center",
        borderColor: "teal"
      }}

      borderRadius="xl"
      p={5}
      color="white"
      border="1px solid"
      borderColor="rgba(2, 193, 115, 0.5)"
      textAlign="center"
      boxShadow="md"
    >
      <Avatar
        size="xl"
        name="Mr. Beast"
        src="https://i.ibb.co/jMLxZ9T/monkey-avatar.png" // Replace with your image source
        mx="auto"
        mb={3}
      />

      <Text fontWeight={'normal'} color="#02C173" mb={2}>
        @Mr. Beast
      </Text>

      <Divider borderColor="whiteAlpha.300" mb={4} />

      <VStack align="start" spacing={2} fontSize="sm">
        <Text>
          <Text as="span" color="#02C173" fontWeight="semibold">
            Niche:
          </Text>{" "}
          Entertainment
        </Text>
        <Text>
          <Text as="span" color="#02C173" fontWeight="semibold">
            Subscribers:
          </Text>{" "}
          100,000+
        </Text>
        <Text>
          <Text as="span" color="#02C173" fontWeight="semibold">
            Average Views:
          </Text>{" "}
          3M - 10M
        </Text>
      </VStack>

      <Button
        mt={6}
        size="sm"
        variant="outline"
        borderColor="green"
        color="#02C173"
        px={5}
        _hover={{ bg: "green", color: "white" }}
      >
        OPEN
      </Button>
    </Box>
  );
};

export default ChannelCard;



