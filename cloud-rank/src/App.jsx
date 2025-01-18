import './App.css';
import Navbar from './components/Navbar';
import PieChart from './components/PieChart';
import UserDetail from './components/UserDetail';
import users from './users.json';
import { useState } from 'react';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  // Handle user selection
  const handleUserSelect = (userId) => {
    // Only update the user if it is a new selection
    setSelectedUser((prevUser) => (prevUser?.userId === userId ? prevUser : users.find((u) => u.userId === userId)));
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <Navbar onSelectUser={handleUserSelect} />

      {/* Conditional Rendering */}
      {selectedUser ? (
        <div className="analytics-section">
          {/* Pie Chart */}
          <PieChart selectedUserId={selectedUser.userId} />

          {/* User Details */}
          <UserDetail user={selectedUser} />
        </div>
      ) : (
        <p className="message">Please select a user to view analytics.</p>
      )}
    </div>
  );
}

export default App;
