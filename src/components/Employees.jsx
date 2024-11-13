import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

function Employees() {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await API.get('/users/employees');
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching employees');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      await API.delete(`/users/employees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
      setSuccess('Employee deleted successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting employee');
    }
  };

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Employees</h3>
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{employee.name}</td>
                <td className="py-2 px-4 border-b">{employee.email}</td>
                <td className="py-2 px-4 border-b">
                  <button 
                    onClick={() => handleDelete(employee._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employees;
