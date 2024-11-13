import React, { useState, useEffect } from 'react';
import API from '../services/api';

function DownloadLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await API.get('/downloads/logs');
        setLogs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching download logs');
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) return <p>Loading download logs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Download Logs</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Employee Name</th>
              <th className="py-2 px-4 border-b">Employee Email</th>
              <th className="py-2 px-4 border-b">PDF Name</th>
              <th className="py-2 px-4 border-b">Downloaded At</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                  {log.employee ? log.employee.name : 'Unknown Employee'}
                </td>
                <td className="py-2 px-4 border-b">
                  {log.employee ? log.employee.email : 'Unknown Email'}
                </td>
                <td className="py-2 px-4 border-b">
                  {log.pdf ? log.pdf.fileName : 'Unknown PDF'}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(log.downloadedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DownloadLogs;
