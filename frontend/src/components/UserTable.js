import React, { useState, useEffect } from 'react';
import axios from 'axios';

// UserTable component fetches and displays user data with pagination and search
const UserTable = () => {
  // State to store fetched users
  const [users, setUsers] = useState([]);
  // State to store total number of users (for pagination)
  const [total, setTotal] = useState(0);
  // Current page number
  const [page, setPage] = useState(1);
  // Search query for filtering users by name
  const [search, setSearch] = useState('');
  // Number of users per page
  const limit = 20;

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  // Function to fetch users from backend API
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users`, {
        params: { page, limit, search },
      });
      setUsers(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };
    // Calculate total number of pages
  const totalPages = Math.ceil(total / limit);

  //generating pagination buttons(prev, next)
  const visiblePages = [];
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, page + 2);
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      {/* Search input */}
      <input
        placeholder="Search by name"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{
          padding: '8px',
          marginBottom: '15px',
          border: '1px solid gray',
          borderRadius: '4px',
        }}
      />

      {/* User data table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: 'lightgray' }}>
          <tr>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td style={cellStyle}>{user.name}</td>
              <td style={cellStyle}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination buttons */}
      <div style={{ marginTop: '15px' }}>
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          style={buttonStyle(false)}
        >
          « Prev
        </button>

        {visiblePages.map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            style={buttonStyle(p === page)}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          style={buttonStyle(false)}
        >
          Next »
        </button>
      </div>
    </div>
  );
};

// table cell styling
const cellStyle = {
  border: '1px solid gray',
  padding: '10px',
  backgroundColor: 'white',
};

// Pagination button styling
const buttonStyle = (active) => ({
  padding: '6px 12px',
  marginRight: '5px',
  backgroundColor: active ? 'skyblue' : 'lightgray',
  color: active ? 'black' : 'black',
  border: '1px solid gray',
  borderRadius: '4px',
  cursor: 'pointer',
});

export default UserTable;
