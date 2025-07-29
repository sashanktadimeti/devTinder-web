import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addUser } from "./utils/userSlice";
import { BASE_URL, EYE_OPEN, EYE_CLOSED } from "./utils/constants";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [gender, setgender] = useState("");
  console.log(gender)
  const [error, seterror] = useState("");
  const [eyeopen, seteyeopen] = useState(false);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-900 py-10">
      <div className="card w-full max-w-sm shadow-2xl bg-white border border-gray-200 rounded-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">
            Create Your Account 👋
          </h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            Signup to get started
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
            <div className="relative">
                          <input
                            onChange={(e) => setpassword(e.target.value)}
                            type={eyeopen ? "text" : "password"}
                            placeholder="Enter your password"
                            className="input input-bordered w-full pr-10"
                            value={password}
                          />
                          <img
                            src={eyeopen ? EYE_OPEN : EYE_CLOSED}
                            alt="Toggle password visibility"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => seteyeopen((prev) => !prev)}
                            style={{ width: "24px", height: "24px" }}
                          />
                        </div>
            
          </fieldset>

          {/* Error */}
          {error && (
            <p className="font-bold text-red-600 text-sm mt-2">
              ERROR: {error.toUpperCase()}!
            </p>
          )}

          {/* Signup Button */}
          <div className="form-control mt-3 flex justify-center">
            <button className="btn btn-primary" onClick={handleSignup}>
              Signup
            </button>
          </div>

          {/* Redirect to Login */}
          <p className="text-center text-sm text-gray-400 mt-2">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;