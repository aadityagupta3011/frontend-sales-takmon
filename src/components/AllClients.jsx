import React, { useState, useEffect } from "react";
import API from "../services/api";

function AllClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const response = await API.get("/all-clients");
        setClients(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching clients");
        setLoading(false);
      }
    };

    fetchAllClients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      await API.delete(`/clients/${id}`); // Corrected route path
      setClients(clients.filter((client) => client._id !== id));
      setSuccess("Client deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting client");
    }
  };

  if (loading) return <p>Loading all clients...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">All Clients</h3>
      {success && <p className="text-green-500 mb-4">{success}</p>}
      {clients.length === 0 ? (
        <p>No clients available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Employee Name</th>
                <th className="py-2 px-4 border-b">Client Name</th>
                <th className="py-2 px-4 border-b">Current Scenario</th>
                <th className="py-2 px-4 border-b">Project Description</th>
                <th className="py-2 px-4 border-b">Rating</th>
                <th className="py-2 px-4 border-b">Created At</th>
                <th className="py-2 px-4 border-b">Updated At</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">
                    {client.employee
                      ? client.employee.name
                      : "Unknown Employee"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {client.clientName ? client.clientName : "Unkown Client"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {client.currentScenario
                      ? client.currentScenario
                      : "Unknown Scenerio"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {client.projectDescription
                      ? client.projectDescription
                      : "Unkknown Description"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {client.rating ? client.rating : "Unknown Rating"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(client.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(client.updatedAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {/* Delete button for boss */}
                    <button
                      onClick={() => handleDelete(client._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllClients;
