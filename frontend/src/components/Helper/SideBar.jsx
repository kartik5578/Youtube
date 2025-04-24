import React, { useState } from "react";
import {
  Box,
  Input,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
  Text,
  Divider,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  VStack,
} from "@chakra-ui/react";

const niches = [
  "Education",
  "Entertainment",
  "Gaming",
  "Infotainment",
  "Travel",
  "Tech",
  "Sports",
  "News",
  "Fashion & Beauty",
  "Music",
];

const subscriberRanges = [
  "< 5K",
  "5K - 10K",
  "10K - 25K",
  "25K - 50K",
  "50K - 100K",
  "100K - 200K",
  "200K - 500K",
  "500K - 1M",
  "1M - 2M",
  "2M - 5M",
  "5M - 10M",
  "> 10M",
];

const SidebarFilter = () => {
  const [selectedNiche, setSelectedNiche] = useState("Education");
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [viewRange, setViewRange] = useState([1, 10]);

  const toggleSub = (range) => {
    setSelectedSubs((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  return (
    <Box
      w="20%"
      h="80%"
      bgGradient="linear(to-b, rgba(43, 255, 255, 0.12) 0%, rgba(43, 255, 255, 0.04) 50%, rgba(43, 255, 255, 0.07) 100%)"
      borderRadius="2xl"
      p={5}
      color="white"
    >
      <Input
        placeholder="Search"
        bg="rgba(255, 255, 255, 0.1)"
         border="1px solid"
                borderColor="rgba(2, 193, 115, 0.5)"
        _placeholder={{ color: "whiteAlpha.700" }}
        mb={5}
      />

      <VStack align="start" spacing={4}>
        <Text fontWeight="bold">Niche</Text>
        <Wrap>
          {niches.map((niche) => (
            <WrapItem key={niche}>
              <Tag
                size="md"
                variant="solid"
                p={1}
                bg={selectedNiche === niche ? "#02C173" : "transparent"}
                color={selectedNiche === niche ? "#02C173" : "white"}
                border="1px solid"
                borderColor="rgba(2, 193, 115, 0.5)"
                _hover={{ cursor: "pointer" }}
                onClick={() => setSelectedNiche(niche)}
              >
                <TagLabel>{niche}</TagLabel>
              </Tag>
            </WrapItem>
          ))}
        </Wrap>

        <Divider borderColor="whiteAlpha.400" />

        <Text fontWeight="bold">Subscribes</Text>
        <Wrap>
          {subscriberRanges.map((range) => (
            <WrapItem key={range}>
              <Tag
                size="md"
                variant="solid"
                p={1}
                bg={
                  selectedSubs.includes(range) ?
                    "#02C173" : "transparent"
                }
                 border="1px solid"
                borderColor="rgba(2, 193, 115, 0.5)"
                color={selectedSubs.includes(range) ? "#02C173" : "white"}
                _hover={{ cursor: "pointer", bg: "whiteAlpha.300" }}
                onClick={() => toggleSub(range)}
              >
                <TagLabel>{range}</TagLabel>
              </Tag>
            </WrapItem>
          ))}
        </Wrap>

        <Divider borderColor="whiteAlpha.400" />

        <Text fontWeight="bold">Average Views</Text>
        <Box w="100%" px={2}>
          <RangeSlider
            defaultValue={[1, 10]}
            min={1}
            max={10}
            step={1}
            onChange={(val) => setViewRange(val)}
            colorScheme="whiteAlpha"
          >
            <RangeSliderTrack bg="whiteAlpha.300">
              <RangeSliderFilledTrack bg="whiteAlpha.900" />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={4} index={0} />
            <RangeSliderThumb boxSize={4} index={1} />
          </RangeSlider>
          <Text mt={2} fontSize="sm">
            {viewRange[0]}K - {viewRange[1]}M+
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default SidebarFilter;
