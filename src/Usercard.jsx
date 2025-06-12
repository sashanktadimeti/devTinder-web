import React from "react";

const Usercard = ({ item }) => {
  return (
    <div>
      <div className="card bg-base-400 w-66 shadow-sm">
        <figure>
          <img src={item.photoUrl} alt="your profile image"/>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{item.firstName + " " + item.lastName}</h2>
          {item.age && item.gender && <p>{item.age + "," + item.gender}</p>}
          {item.about && <p>{item.about}</p>}
          <div className="card-actions justify-center my-2">
            <button className="btn btn-secondary">Interested</button>
            <button className="btn btn-primary">Reject</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
