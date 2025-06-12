import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";
import { removeUser } from "./utils/userSlice";
import { useEffect } from "react";
const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleclick = async(e)=>{
    try{
    const result = await axios.post(BASE_URL+"/logout",{},{withCredentials: true})
    dispatch(removeUser())
    return navigate("/")
    }
    catch(err){
      console.log(err)
    }

  }
  const user = useSelector((store)=>store.user)
  return (
    <div className="navbar bg-neutral shadow-sm">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl text-neutral-content">
          devTinder🧑‍💻
        </Link>
      </div>
      <div className="flex gap-2">
        {user?.payload?.firstName ? (
          <p style={{ color: "white", fontWeight: "bold", padding: "5px" }}>
            Welcome, {user.firstName.toUpperCase()}
          </p>
        ) : (
          ""
        )}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ml-3">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  user?.photoUrl
                    ? user.photoUrl
                    :"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a  onClick={handleclick}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
