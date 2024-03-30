import { Box, Icon } from '@chakra-ui/react';
import { FaArrowUp, FaArrowDown, FaArrowRight } from 'react-icons/fa';

const MarketArrow = ({ marketDirection }) => {
  let arrowIcon;
  let arrowColor;

  // Determine arrow icon and color based on market direction
  if (marketDirection === 'up') {
    arrowIcon = FaArrowUp;
    arrowColor = 'green.500';
  } else if (marketDirection === 'down') {
    arrowIcon = FaArrowDown;
    arrowColor = 'red.500';
  } else {
    arrowIcon = FaArrowRight;
    arrowColor = 'brand.main';
  }

  return (
    <Box display="inline-block" color={arrowColor}>
      {arrowIcon && <Icon as={arrowIcon} />}
    </Box>
  );
};

export default MarketArrow;
