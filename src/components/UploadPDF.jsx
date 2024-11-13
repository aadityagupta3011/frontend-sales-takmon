import React, { useState } from 'react';
import API from '../services/api';

function UploadPDF() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!file) {
      setError('Please select a PDF to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await API.post('/pdfs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Error uploading PDF');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Upload PDF</h3>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form onSubmit={handleUpload}>
        <div className="mb-4">
          <input 
            type="file" 
            accept="application/pdf" 
            onChange={handleFileChange}
            required
            className="w-full"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadPDF;
