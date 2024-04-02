import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const CryptoChart = ({ data, brandColor }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
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
      // Remove the leading '#', if present
      hex = hex.replace(/^#/, '');

      // Parse the hexadecimal color value
      const bigint = parseInt(hex, 16);

      // Extract the RGB components
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;

      // Return the RGB components as a string
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

  return <div ref={chartContainerRef} style={{ width: "100%", height: "300px" }}></div>;
};

export default CryptoChart;
