import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const CryptoChart = ({ data, brandColor }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        textColor: "black",
        background: {
          type: "solid",
          color: "white",
        },
      },
    });

    // Function to convert hexadecimal color to RGB format
    function hexToRgb(hex) {
      hex = hex.replace(/^#/, '');
      const bigint = parseInt(hex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r}, ${g}, ${b}`;
    }

    const areaSeries = chart.addAreaSeries({
      lineColor: brandColor,
      topColor: brandColor,
      bottomColor: `rgba(${hexToRgb(brandColor)}, 0.28)`,
    });

    areaSeries.setData(data);

    return () => {
      chart.remove();
    };
  }, [data, brandColor]);

  // Return an empty fragment if there is no data
  if (!data || data.length === 0) {
    return <></>;
  }

  return <div ref={chartContainerRef} style={{ maxWidth: "600px", height: "300px" }}></div>;
};

export default CryptoChart;
