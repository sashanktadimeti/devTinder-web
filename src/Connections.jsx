import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionsList = useSelector((store) => store.connections);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const result = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(result.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
      setError("Unable to fetch connections. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="bg-white min-h-screen p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Connections</h2>

      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {error && (
        <div className="alert alert-error shadow-lg mb-4 max-w-md mx-auto">
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && connectionsList.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No connections found.</p>
      )}

      {/* Scrollable container with bottom padding to avoid footer overlap */}
      <div className="flex flex-col items-center gap-6 overflow-y-auto pb-40">
        {connectionsList &&
          connectionsList.map((connection, index) => (
            
            <div
              key={index}
              className="w-full max-w-md flex flex-col md:flex-row items-center md:items-start gap-6 p-4 border border-gray-200 shadow-md rounded-xl bg-base-100"
            >
              <img
                src={connection.photoUrl}
                alt={`${connection.firstName} ${connection.lastName}`}
                className="w-32 h-32 rounded-lg object-cover shadow"
              />
              <div className="text-left space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {connection.firstName} {connection.lastName}
                </h3>
                <p className="text-sm text-gray-600">{connection.about}</p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Age:</span> {connection.age}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Connections;
