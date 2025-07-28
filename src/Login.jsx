import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import { BASE_URL, EYE_OPEN, EYE_CLOSED } from "./utils/constants";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [error, seterror] = useState("")
  const [eyeopen, seteyeopen] = useState(false);
  const handleLogin = async () => {
    try {
      const result = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(result.data))
      return navigate("/feed")
    } catch (err) {
      seterror(err?.response?.data?.message)
    }
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <div className="flex justify-center items-start h-screen bg-gray-900 pt-5">
      <div className="card w-full max-w-sm shadow-2xl bg-white border border-gray-200 rounded-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
            Welcome Back 👋
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Login to your account
          </p>

          <fieldset className="form-control mb-4">
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

          <fieldset className="form-control mb-4">
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
          {error && (<p className="font-bold text-red-600 ">ERROR: {error.toUpperCase()}!</p>)}
          <div className="form-control mt-3 flex justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-4">
            Don’t have an account?{" "}
            <a
              className="text-blue-400 hover:underline cursor-pointer"
              onClick={handleSignup}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
