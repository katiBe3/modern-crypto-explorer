import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const CryptoChart = ({ data }) => {
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

    const areaSeries = chart.addAreaSeries({
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
    });

    areaSeries.setData(data);

    return () => {
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} style={{ width: "100%", height: "300px" }}></div>;
};

export default CryptoChart;
