import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { BASE_URL } from "./utils/constants";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [gender, setgender] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    try {
      const result = await axios.post(
        BASE_URL + "/signup",
        {
          emailId: email,
          password,
          firstName,
          lastName,
          gender,
        },
        { withCredentials: true }
      );
      dispatch(addUser(result.data.data));
      return navigate("/profile");
    } catch (err) {
      seterror(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 px-4 overflow-y-auto">
      <div className="card w-full max-w-sm shadow-2xl bg-white border border-gray-200 rounded-2xl my-10">
        <div className="card-body flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-1">
              Create Your Account 👋
            </h2>
            <p className="text-sm text-gray-500 text-center mb-1">
              Signup to get started
            </p>
             <p className="text-center text-sm text-gray-400 ">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Login
            </Link>
          </p>
            {/* First Name */}
            <fieldset className="form-control mb-2">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Type your first name"
                className="input input-bordered"
                value={firstName}
              />
            </fieldset>

            {/* Last Name */}
            <fieldset className="form-control mb-2">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Type your last name"
                className="input input-bordered"
                value={lastName}
              />
            </fieldset>

            {/* Gender Dropdown */}
            <fieldset className="form-control mb-2">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                className="select select-bordered"
                value={gender}
                onChange={(e) => {
                  setgender(e.target.value);
                }}
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </fieldset>

            {/* Email */}
            <fieldset className="form-control mb-2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                onChange={(e) => setemail(e.target.value)}
                type="email"
                placeholder="Type your email"
                className="input input-bordered"
                value={email}
              />
            </fieldset>

            {/* Password */}
            <fieldset className="form-control mb-2">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                value={password}
              />
            </fieldset>

            {/* Error */}
            {error && (
              <p className="font-bold text-red-600 text-sm mt-2">
                ERROR: {error.toUpperCase()}!
              </p>
            )}

            {/* Signup Button */}
            <div className="form-control mt-1 flex justify-center">
              <button className="btn btn-primary" onClick={handleSignup}>
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
