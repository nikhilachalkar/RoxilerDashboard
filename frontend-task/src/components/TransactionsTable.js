import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`https://roxilerdashboard-yogu.onrender.com/transactions`, {
        params: { month: selectedMonth, search: searchTerm, page, perPage },
      });
      console.log('Transactions Data:', response.data); // Log data to check imageUrl
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, searchTerm, page]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <h2>Transactions Table for Month {selectedMonth}</h2>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th><th>Title</th><th>Description</th><th>Category</th><th>Price</th><th>Date of Sale</th><th>Product Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td><td>{transaction.title}</td><td>{transaction.description}</td><td>{transaction.category}</td><td>${transaction.price}</td><td>{transaction.dateOfSale}</td>
              <td>
                <img
                  src={transaction.image}
                  alt={transaction.title || 'Product image'}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default TransactionsTable;
