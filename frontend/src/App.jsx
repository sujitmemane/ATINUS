import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import MainApp from "./pages/User/MainApp";

import Replies from "./pages/User/Replies";
import Reposts from "./pages/User/Reposts";
import Posts from "./pages/User/Posts";
import Profile from "./pages/User/Profile";
import Modal from "./UI/Modal";
import OnModal from "./UI/OnModal";
import Home from "./pages/User/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/" element={<MainApp />}>
            <Route index element={<ProtectedRoutes element={<Home />} />} />
            <Route path="/profile" element={<Profile />}>
              <Route index path="posts" element={<Posts />} />
              <Route path="replies" element={<Replies />} />
              <Route path="reposts" element={<Reposts />} />
            </Route>
          </Route>
        </Routes>
        <Modal />
        <OnModal />
      </BrowserRouter>
    </>
  );
}

export default App;
