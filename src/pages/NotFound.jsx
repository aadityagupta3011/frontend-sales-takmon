import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <Link to="/" className="text-blue-500 underline">Go to Login</Link>
    </div>
  );
}

export default NotFound;
