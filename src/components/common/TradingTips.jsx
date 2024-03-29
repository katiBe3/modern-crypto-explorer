import React, { useState } from "react";
import { tradingTips } from  "../../data/TradingTips";
import CTASection from "../layout/CTASection";

const TradingTips = () => {
  // State to store the currently displayed trading tip
  const [currentTip] = useState(getRandomTradingTip());

  // Function to select a random trading tip
  function getRandomTradingTip() {
    const randomIndex = Math.floor(Math.random() * tradingTips.length);
    return tradingTips[randomIndex];
  }

  return (
    <CTASection topic="Trade Like a Pro" title={currentTip.title} buttonName="More Tips" buttonRoute="./learn">
      {currentTip.text}
    </CTASection>
  );
};

export default TradingTips;
