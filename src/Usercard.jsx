import axios from "axios";
import React from "react";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "./utils/feedSlice";

const Usercard = ({ item }) => {
  const dispatch = useDispatch();

  const handleInterest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/sendConnectionRequest/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      // Handle error (optional)
    }
  };

  return (
    <div className="max-w-sm mx-auto my-2">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl">
        {/* Profile Image (keep this outside scrollable area) */}
        <figure className="px-4 pt-4 flex justify-center">
          <img
            src={item.photoUrl}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover border border-gray-300"
          />
        </figure>

        {/* Scrollable content only inside the body */}
        <div className="card-body items-center text-center overflow-y-auto max-h-[300px]">
          {/* Name */}
          <h2 className="card-title text-xl font-bold text-neutral">
            {item.firstName?.toUpperCase()} {item.lastName?.toUpperCase()}
          </h2>

          {/* Age & Gender */}
          {item.age && item.gender && (
            <p className="text-sm text-gray-500">
              {item.age} years old, {item.gender}
            </p>
          )}

          {/* About */}
          {item.about && (
            <p className="mt-2 text-sm text-gray-700 italic">"{item.about}"</p>
          )}

          {/* Skills */}
          {item.skills && (
            <div className="mt-3">
              <p className="text-sm font-semibold text-primary mb-1">Likes:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {(Array.isArray(item.skills)
                  ? item.skills
                  : item.skills.split(",")
                ).map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-outline badge-primary text-xs px-3 py-1"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="card-actions mt-5 flex justify-center gap-3">
            <button
              className="btn btn-outline btn-success"
              onClick={() => handleInterest("interested", item._id)}
            >
              Interested
            </button>
            <button
              className="btn btn-outline btn-error"
              onClick={() => handleInterest("rejected", item._id)}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
