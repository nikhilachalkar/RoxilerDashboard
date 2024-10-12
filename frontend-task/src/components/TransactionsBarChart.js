import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js'; // Register required elements
import axios from 'axios';

// Register necessary elements with Chart.js
Chart.register(CategoryScale, LinearScale, BarElement);

const TransactionsBarChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of items',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  });

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(`https://roxilerdashboard-yogu.onrender.com/price-range-bar-chart`, {
        params: { month: selectedMonth },
      });
  
      console.log("API Response:", response.data); // Log the response to see the structure
  
      if (response.data && Array.isArray(response.data)) {
        const labels = response.data.map((range) => range.range);
        const counts = response.data.map((range) => range.count);
  
        setChartData({
          labels,
          datasets: [
            {
              label: 'Number of items',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };
  
  useEffect(() => {
    fetchBarChartData();
    console.log("Chart Data:", chartData); // Add this to check the chart data
  }, [selectedMonth, chartData]); // Make sure to add chartData to the dependency array
  

  return (
    <div className="bar-chart">
      <Bar data={chartData} />
    </div>
  );
};

export default TransactionsBarChart;
