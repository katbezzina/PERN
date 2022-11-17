import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationMenu from "./Components/NavigationMenu.tsx";

import LandingPage from "./Views/LandingPage";
import Home from "./Views/Home";
import Login from "./Views/Login.tsx";
import Register from "./Views/Register.tsx";
import Item from "./Views/Item.tsx";
import AddPost from "./Views/AddPost.tsx";
import MyProfile from "./Views/MyProfile";

import { PostsContextProvider } from "./Context/PostsContext";
import { AuthContextProvider } from "./Context/AuthContext.tsx";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <PostsContextProvider>
          <NavigationMenu />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Home/:id" element={<Item />} />
            <Route path="/MyPosting" element={<AddPost />} />
            <Route path="/MyProfile" element={<MyProfile />} />
          </Routes>
        </PostsContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
