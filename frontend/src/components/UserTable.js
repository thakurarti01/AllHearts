// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserTable = () => {
//   const [users, setUsers] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState('');
//   const limit = 20;

//   useEffect(() => {
//     fetchUsers();
//   }, [page, search]);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/users`, {
//         params: { page, limit, search },
//       });
//       setUsers(res.data.data);
//       setTotal(res.data.total);
//     } catch (err) {
//       console.error('Failed to fetch users:', err);
//     }
//   };

//   const totalPages = Math.ceil(total / limit);

//   return (
//     <div>
//       <input
//         placeholder="Search by name"
//         style={{ padding: '8px', marginBottom: '10px' }}
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value);
//           setPage(1);
//         }}
//       />

//       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th style={cellStyle}>Name</th>
//             <th style={cellStyle}>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user._id}>
//               <td style={cellStyle}>{user.name}</td>
//               <td style={cellStyle}>{user.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div style={{ marginTop: '10px' }}>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             style={buttonStyle(i + 1 === page)}
//             onClick={() => setPage(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// const cellStyle = {
//   border: '1px solid #ccc',
//   padding: '8px',
// };

// const buttonStyle = (active) => ({
//   padding: '6px 12px',
//   marginRight: '5px',
//   backgroundColor: active ? '#007bff' : '#eee',
//   color: active ? '#fff' : '#000',
//   border: 'none',
//   cursor: 'pointer',
// });

// export default UserTable;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 20;

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

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

  const totalPages = Math.ceil(total / limit);

  // Calculate visible page range
  const visiblePages = [];
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, page + 2);
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>User Table</h2>

      <input
        placeholder="Search by name"
        style={{ padding: '8px', marginBottom: '10px', width: '100%', maxWidth: '300px' }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // reset to first page on new search
        }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Email</th>
          </tr>
        </thead>
        <tbody>
          {!users || users.length === 0 ? (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>
                No users found.
              </td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user._id}>
                <td style={cellStyle}>{user.name}</td>
                <td style={cellStyle}>{user.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={buttonStyle(false)}
        >
          « Prev
        </button>

        {visiblePages.map((p) => (
          <button
            key={p}
            style={buttonStyle(p === page)}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          style={buttonStyle(false)}
        >
          Next »
        </button>
      </div>
    </div>
  );
};

const cellStyle = {
  border: '1px solid #ccc',
  padding: '8px',
};

const buttonStyle = (active) => ({
  padding: '6px 12px',
  margin: '0 5px',
  backgroundColor: active ? '#007bff' : '#eee',
  color: active ? '#fff' : '#000',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
});

export default UserTable;
