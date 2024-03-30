import React, { useState, useEffect } from "react";
import { Box, IconButton, Flex, Circle } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CardSlider = ({ cards, hasAutoSlide = false, slideInterval = 5000, hasNavigation = false, hasPoints = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide effect
  useEffect(() => {
    let intervalId;
    if (hasAutoSlide) {
      intervalId = setInterval(() => {
        setCurrentIndex((oldIndex) => (oldIndex === cards.length - 1 ? 0 : oldIndex + 1));
      }, slideInterval);
    }
    return () => clearInterval(intervalId);
  }, [hasAutoSlide, cards.length, slideInterval]);

  const prevSlide = () => {
    setCurrentIndex((oldIndex) => (oldIndex === 0 ? cards.length - 1 : oldIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((oldIndex) => (oldIndex === cards.length - 1 ? 0 : oldIndex + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Box position="relative" height={{ base: "210px", md: "100%" }} width="100%" sx={{ maxWidth: { base: "320px", md: "none" } }}>
      {hasNavigation && (
        <>
          <IconButton aria-label="Previous Slide" icon={<FaChevronLeft />} position="absolute" left="2" top="50%" transform="translate(0, -50%)" zIndex="2" onClick={prevSlide} />
          <IconButton aria-label="Next Slide" icon={<FaChevronRight />} position="absolute" right="2" top="50%" transform="translate(0, -50%)" zIndex="2" onClick={nextSlide} />
        </>
      )}
      {cards.map((card, index) => (
        <Box key={index} position="absolute" top="0" left="0" right="0" bottom="0" opacity={index === currentIndex ? "1" : "0"} transition="opacity 0.5s">
          {card}
        </Box>
      ))}
      {hasPoints && (
        <Flex position="absolute" bottom="2" left="50%" transform="translateX(-50%)" zIndex="2" width="100%" justifyContent="center">
          {cards.map((_, index) => (
            <Circle key={index} size="3" mx="1" my="2" bg={index === currentIndex ? "brand.main" : "gray.200"} _hover={{ cursor: "pointer" }} onClick={() => goToSlide(index)} />
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default CardSlider;
