import React, { useState } from 'react';
import API from '../services/api';

function ClientForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    currentScenario: '',
    projectDescription: '',
    rating: 'Bad',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await API.post('/clients', formData);
      setMessage(response.data.message);
      setFormData({
        clientName: '',
        currentScenario: '',
        projectDescription: '',
        rating: 'Bad',
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating client');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Add New Client</h3>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Client Name:</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Current Scenario:</label>
          <input
            type="text"
            name="currentScenario"
            value={formData.currentScenario}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Project Description:</label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Rating:</label>
          <div className="flex space-x-4">
            {['Bad', 'So So', 'Good', 'Got it'].map(option => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={option}
                  checked={formData.rating === option}
                  onChange={handleChange}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition duration-200"
        >
          Add Client
        </button>
      </form>
    </div>
  );
}

export default ClientForm;
