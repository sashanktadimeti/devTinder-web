import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Usercard from "./Usercard";

const Profile = () => {
  const user = useSelector((store) => store.user);
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary text-lg">
          Loading profile...
        </span>
      </div>
    );
  }
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [skills, setSkills] = useState(user.skills);
  const [about, setAbout] = useState(user.about);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
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
                <span className="label-text">FirstName</span>
              </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="edit firstName"
                className="input input-bordered"
                value={firstName}
              />
            </fieldset>

            <fieldset className="form-control mb-0.5">
              <label className="label">
                <span className="label-text">LastName</span>
              </label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="edit lastName"
                className="input input-bordered"
                value={lastName}
              />
            </fieldset>

            <fieldset className="form-control mb-0.5">
              <label className="label">
                <span className="label-text">PhotoUrl</span>
              </label>
              <input
                onChange={(e) => setPhotoUrl(e.target.value)}
                type="text"
                placeholder="edit photo"
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
                placeholder="edit about section"
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
                placeholder="edit age"
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
                placeholder="must be comma separated values"
                className="input input-bordered"
                value={skills}
              />
            </fieldset>

            <div className="form-control mt-0.5 flex justify-center">
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-base-900 w-72 pl-3 shadow-sm">
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
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
