import React, { useState } from "react";
import { tradingTips } from "../../data/TradingTips";
import CTASection from "../layout/CTASection";

const TradingTips = () => {
  const [currentTip, setCurrentTip] = useState(getRandomTradingTip());

  function getRandomTradingTip() {
    const randomIndex = Math.floor(Math.random() * tradingTips.length);
    return tradingTips[randomIndex];
  }

  function handleMoreClick(event) {
    event.preventDefault();
    setCurrentTip(getRandomTradingTip());
  }

  return (
    <CTASection topic="Trade Like a Pro" title={currentTip.title} buttonName="More" buttonRoute="#" onButtonClick={handleMoreClick}>
      {currentTip.text}
    </CTASection>
  );
};

export default TradingTips;
