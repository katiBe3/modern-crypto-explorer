import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const CryptoChart = ({ data }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = useRef(null);

    useEffect(() => {
      if (data && data.length > 0) {
        chart.current = createChart(chartContainerRef.current, { width: chartContainerRef.current.clientWidth, height: 300 });
        const lineSeries = chart.current.addLineSeries();
        lineSeries.setData(data);
      }

      return () => {
        if (chart.current) {
          chart.current.remove();
          chart.current = null;
        }
      };
    }, [data]);
  }, [data]);

  return (
    <div ref={chartContainerRef} style={{ position: "relative", width: "100%", height: "300px" }}>
      {!data && <div>Loading...</div>}
    </div>
  );
};

export default CryptoChart;
