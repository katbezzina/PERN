import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationMenu from "./Components/NavigationMenu";
// import ProtectedRoute from "./Components/ProtectedRoute";
import LandingPage from "./Views/LandingPage";
import Home from "./Views/Home";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Item from "./Views/Item";
import AddPost from "./Views/AddPost";
import MyProfile from "./Views/MyProfile";
import MyPosts from "./Views/MyPosts";
import MyLikes from "./Views/MyLikes";
import ScrollToTop from "./Components/ScrollToTop";

import { PostsContextProvider } from "./Context/PostsContext";
import { AuthContextProvider } from "./Context/AuthContext";
import "./App.css";


function App() {
  return (
    <Router>
      <AuthContextProvider>
        <PostsContextProvider>
          <NavigationMenu />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Home/:id" element={<Item />} />
            <Route path="/MyPosting" element={<AddPost />} />
            <Route path="/MyProfile" element={<MyProfile />} />
            <Route path="/MyPosts" element={<MyPosts />} />
            <Route path="/MyFavourites" element={<MyLikes />} />
          </Routes>
        </PostsContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
