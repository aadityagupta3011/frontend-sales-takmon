import React, { useState, useEffect } from "react";
import API from "../services/api";

function MyClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editClient, setEditClient] = useState(null); // Track the client being edited

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await API.get("/clients");
        setClients(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching clients");
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      await API.delete(`/clients/${id}`);
      setClients(clients.filter((client) => client._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting client");
    }
  };

  const handleEdit = (client) => {
    setEditClient(client); // Prefill the client data
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { _id, clientName, currentScenario, projectDescription, rating } =
      editClient;

    try {
      await API.put(`/clients/${_id}`, {
        clientName,
        currentScenario,
        projectDescription,
        rating,
      });
      setClients(clients.map((c) => (c._id === _id ? editClient : c)));
      setEditClient(null); // Close the form
    } catch (err) {
      setError(err.response?.data?.message || "Error updating client");
    }
  };

  if (loading) return <p>Loading your clients...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">My Clients</h3>

      {editClient && (
        <form onSubmit={handleUpdate} className="mb-8">
          <input
            type="text"
            value={editClient.clientName}
            onChange={(e) =>
              setEditClient({ ...editClient, clientName: e.target.value })
            }
            placeholder="Client Name"
          />
          {/* Add other fields similarly */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded">
            Update Client
          </button>
        </form>
      )}

      {clients.length === 0 ? (
        <p>No clients added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Current Scenario</th>
                <th>Project Description</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id}>
                  <td>{client.clientName}</td>
                  <td>{client.currentScenario}</td>
                  <td>{client.projectDescription}</td>
                  <td>{client.rating}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(client)}
                      className="bg-yellow-500 px-2 py-1 rounded">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(client._id)}
                      className="bg-red-500 px-2 py-1 rounded">
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

export default MyClients;
