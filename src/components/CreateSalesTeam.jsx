import React, { useState } from 'react';
import API from '../services/api';

function CreateSalesTeam() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await API.post('/auth/register-sales-team', formData);
      setMessage(response.data);
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      setMessage(error.response?.data || 'Error creating sales team member');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Create Sales Team Member</h3>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleCreate}>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition duration-200"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default CreateSalesTeam;
