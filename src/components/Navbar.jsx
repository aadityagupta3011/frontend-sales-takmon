import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <Link to="/" className="text-white font-bold text-xl">Sales PDF App</Link>
      <div className="flex items-center space-x-4">
        {user && (
          <>
            {user.role === 'boss' && (
              <Link to="/boss-dashboard" className="text-white hover:text-gray-200">Dashboard</Link>
            )}
            {user.role === 'sales_team' && (
              <Link to="/sales-dashboard" className="text-white hover:text-gray-200">Dashboard</Link>
            )}
            <button 
              onClick={logout} 
              className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
