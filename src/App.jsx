import Body from "./Body";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Feed from "./Feed";
import Signup from "./Signup";
import Connections from "./Connections";
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";
import Requests from "./Requests";
function App() {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/connections" element={<Connections/>}/>
            <Route path="/viewrequests" element={<Requests/>}/>
          </Route>
          
        </Routes>

      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
