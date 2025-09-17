
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from '../services/api';

export default function AdminDashboard() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        if (!token || !user || user.role !== 'admin') {
          setError("Please log in as admin.");
          navigate("/login");
          return;
        }
        const response = await api.get('/auth/clients');
        setClients(response.data.data);
      } catch (err) {
        setError("Failed to load clients.");
        console.error("Error fetching clients:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClients();
  }, [token, user, navigate]);

  if (isLoading) return <div className="text-center py-12 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Admin Dashboard - Clients
        </h2>
        {clients.length === 0 ? (
          <p className="text-center text-gray-600">No clients found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Role</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Registered</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client._id}>
                    <td className="py-3 px-4">{client.email}</td>
                    <td className="py-3 px-4">{client.role}</td>
                    <td className="py-3 px-4">{new Date(client.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      {client.lastLogin ? new Date(client.lastLogin).toLocaleString() : "Never"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}