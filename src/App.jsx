import Body from "./Body";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Feed from "./Feed";
import Signup from "./Signup";
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";
function App() {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/feed" element={<Feed/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
