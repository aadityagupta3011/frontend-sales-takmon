import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import API from '../services/api';
import MyClients from '../components/MyClients';
import ClientForm from '../components/ClientForm';

function SalesDashboard() {
  const [pdfs, setPdfs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const response = await API.get('/pdfs/all');
        setPdfs(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching PDFs');
      }
    };

    fetchPDFs();
  }, []);

  const handleDownload = async (id, fileName) => {
    try {
      const response = await API.get(`/pdfs/download/${id}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      alert(error.response?.data?.message || 'Error downloading PDF');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Sales Team Dashboard</h2>
        <div>
        <ClientForm /> {/* Add ClientForm for adding new clients */}
        <MyClients /> {/* Add MyClients to view own clients */}

        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pdfs.map((pdf) => (
            <div key={pdf._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">{pdf.fileName}</h3>
              <button 
                onClick={() => handleDownload(pdf._id, pdf.fileName)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
              >
                Download
              </button>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default SalesDashboard;
