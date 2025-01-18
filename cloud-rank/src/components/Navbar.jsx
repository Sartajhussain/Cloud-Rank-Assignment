import React from 'react';
import '../../src/App.css';
import users from '../users.json';

function Navbar({ onSelectUser }) {
  const handleChange = (event) => {
    const selectedUserId = event.target.value;
    if (onSelectUser) {
      onSelectUser(selectedUserId); 
    }
  };

  return (
    <div className="flex justify-center items-start bg-gray-100">
      <nav className="header-nav">
        <h1 className="text-xl font-bold text-center mt-4 mb-4 text-white">Select User</h1>
        <select
          name="users"  
          id="user-select"
          className="select_opt border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        >
          <option value="">Select User</option>
          {users.map((user, index) => (
            <option value={user.userId} key={index}>
              {user.userName}
            </option>
          ))}
        </select>
      </nav>
    </div>
  );
}

export default Navbar;
