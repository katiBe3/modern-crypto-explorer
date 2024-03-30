import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const CryptoChart = ({ color, data }) => {
  const chartData = useMemo(() => {
    if (!data) return null;

    return {
      labels: data.map((_, index) => index + 1),
      datasets: [
        {
          data: data.map((dataPoint) => parseFloat(dataPoint.priceUsd)),
          borderColor: color,
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    };
  }, [data, color]);

  const chartOptions = {
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
  };

  if (!chartData) return null;

  return <Line data={chartData} options={chartOptions} />;
};

export default CryptoChart;
