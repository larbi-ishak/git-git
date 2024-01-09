
import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartComponent = ({ xData, yData }) => {
  const data = {
    labels: xData, // Array of x values
    datasets: [
      {
        label: 'Data Visualization',
        data: yData, // Array of y values
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Data Visualization</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
