import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import Usercard from "./Usercard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      if (feed && feed.length > 0) return;
      const result = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(result?.data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return <h1 className="flex justify-center my-auto">Loading...</h1>;
  }

  if (!feed || feed.length <= 0) {
    return <h1 className="flex justify-center my-auto">No new users found</h1>;
  }

  return (
    <div className="flex justify-center my-2">
      <Usercard item={feed[0]} />
    </div>
  );
};

export default Feed;
