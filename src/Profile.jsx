import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Usercard from "./Usercard";
import { BASE_URL } from "./utils/constants";
import axios from "axios";
import { addUser } from "./utils/userSlice";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [skills, setSkills] = useState("");
  const [about, setAbout] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [_id, setUserId] = useState("");
  const dispatch = useDispatch();
  const [profileSaved, setprofileSaved] = useState("")
  const [showToast, setShowToast] = useState(false);
  const handleToast = (msg)=>{
    setShowToast(true)
    setprofileSaved(msg)
    setTimeout(()=>{setShowToast(false)},3000)
  }
  const handleSave = async () => {
    try {
      let changedskills;
      if (!Array.isArray(skills)) {
        changedskills = skills.split(",");
      }
      const result = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          skills: changedskills ? changedskills : skills,
          about,
          age,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(result?.data?.user));
      handleToast("Profile saved successfully")
    } catch (err) {
      handleToast(err.response.data.message)
    }
  };
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhotoUrl(user.photoUrl || "");
      setSkills(user.skills || "");
      setAbout(user.about || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setUserId(user._id  || "")
    }
  }, [user]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="flex justify-center items-center gap-10">
      <div className="flex justify-center items-start h-screen">
        <div className="card w-96 max-w-xs shadow-2xl bg-white border border-gray-200 rounded-2xl overflow-y-auto">
          <div className="card-body">
            <p className="text-sm text-gray-500 text-center">
              Edit your Profile
            </p>

            <fieldset className="form-control mb-0.5">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Edit first name"
                className="input input-bordered"
                value={firstName}
              />
            </fieldset>

            <fieldset className="form-control mb-0.5">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Edit last name"
                className="input input-bordered"
                value={lastName}
              />
            </fieldset>

            <fieldset className="form-control mb-0.5">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                onChange={(e) => setPhotoUrl(e.target.value)}
                type="text"
                placeholder="Edit photo URL"
                className="input input-bordered"
                value={photoUrl}
              />
            </fieldset>

            <fieldset className="form-control mb-0.5">
              <label className="label">
                <span className="label-text">About</span>
              </label>
              <input
                onChange={(e) => setAbout(e.target.value)}
                type="text"
                placeholder="Edit about section"
                className="input input-bordered"
                value={about}
              />
            </fieldset>

            <fieldset className="form-control mb-0.5">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                onChange={(e) => setAge(e.target.value)}
                type="number"
                placeholder="Edit age"
                className="input input-bordered"
                value={age}
              />
            </fieldset>

            <fieldset className="form-control mb-0.5">
              <label className="label">
                <span className="label-text">Skills</span>
              </label>
              <input
                onChange={(e) => setSkills(e.target.value)}
                type="text"
                placeholder="Must be comma-separated values"
                className="input input-bordered"
                value={skills}
              />
            </fieldset>

            <div className="form-control mt-0.5 flex justify-center">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleSave();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-900 w-72 pl-3 pr-4 shadow-sm">
        <p className="mx-auto text-2xl text-black p-3 font-bold">
          Preview Card
        </p>
        <Usercard
          item={{
            firstName,
            lastName,
            photoUrl,
            gender,
            age,
            about,
            _id
          }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{profileSaved}.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
