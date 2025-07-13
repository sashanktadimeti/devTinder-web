import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "./utils/requests";

const Requests = () => {
  const dispatch = useDispatch();
  const friendRequests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const results = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(results.data.data));
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(`${BASE_URL}/review/${status}/${_id}`, {}, {
        withCredentials: true,
      });
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(`Failed to ${status} request:`, err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="bg-white min-h-screen p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Friend Requests</h2>

      {friendRequests?.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No friend requests.</p>
      )}

      {/* Scrollable container with bottom padding to prevent overlap with fixed footer */}
      <div className="flex flex-col items-center gap-6 overflow-y-auto pb-40">
        {friendRequests?.map((request, index) => (
          <div
            key={index}
            className="w-full max-w-md flex items-start gap-4 p-4 bg-base-100 rounded-xl shadow-md border border-gray-200"
          >
            <img
              src={request.photoUrl}
              alt={`${request.firstName} ${request.lastName}`}
              className="w-20 h-20 rounded-full object-cover border border-gray-300"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {request.firstName} {request.lastName}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">About:</span> {request.about || "No bio available"}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Gender:</span> {request.gender || "Not specified"}
              </p>

              {/* Skills */}
              {request.skills?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {request.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="badge badge-outline badge-sm text-xs px-3 py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-3 flex gap-2">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
