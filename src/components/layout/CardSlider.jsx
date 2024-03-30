import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, useBreakpointValue } from "react-icons/fa";

const CardSlider = ({ cards, hasAutoSlide = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Auto slide effect
  useEffect(() => {
    let intervalId;
    if (hasAutoSlide) {
      intervalId = setInterval(() => {
        setCurrentIndex((oldIndex) => (oldIndex === cards.length - 1 ? 0 : oldIndex + 1));
      }, 5000); // Slide every 5 seconds
    }
    return () => clearInterval(intervalId);
  }, [hasAutoSlide, cards.length]);

  const prevSlide = () => {
    setCurrentIndex((oldIndex) => (oldIndex === 0 ? cards.length - 1 : oldIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((oldIndex) => (oldIndex === cards.length - 1 ? 0 : oldIndex + 1));
  };

  return (
    <Box position="relative" height="100%" width="100%" maxWidth={isMobile ? "320px" : "none"} >
      <IconButton aria-label="Previous Slide" icon={<FaChevronLeft />} position="absolute" left="2" top="50%" transform="translate(0, -50%)" zIndex="2" onClick={prevSlide} />
      {cards.map((card, index) => (
        <Box key={index} position="absolute" top="0" left="0" right="0" bottom="0" opacity={index === currentIndex ? "1" : "0"} transition="opacity 0.5s">
          {card}
        </Box>
      ))}
      <IconButton aria-label="Next Slide" icon={<FaChevronRight />} position="absolute" right="2" top="50%" transform="translate(0, -50%)" zIndex="2" onClick={nextSlide} />
    </Box>
  );
};

export default CardSlider;
