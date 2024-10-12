// src/components/TransactionsStatistics.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsStatistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({ totalSaleAmount: 0, soldItems: 0, notSoldItems: 0 });

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`https://roxilerdashboard-yogu.onrender.com/statistics`, {
        params: { month: selectedMonth },
      });
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  return (
    <div className="statistics">
      <div>Total Sales: ${statistics.totalSaleAmount}</div>
      <div>Sold Items: {statistics.soldItems}</div>
      <div>Not Sold Items: {statistics.notSoldItems}</div>
    </div>
  );
};

export default TransactionsStatistics;
