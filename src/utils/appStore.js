import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice"
import connectionsReducer from "./connectionsSlice";
import requestReducer from "./requests";
console.log("store initialized");
export const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestReducer
  },
});
