import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationMenu from "./Components/NavigationMenu.tsx";
import ProtectedRoute from "./Components/ProtectedRoute";
import LandingPage from "./Views/LandingPage";
import Home from "./Views/Home";
import Login from "./Views/Login.tsx";
import Register from "./Views/Register.tsx";
import Item from "./Views/Item";
import AddPost from "./Views/AddPost.tsx";
import MyProfile from "./Views/MyProfile";
import ViewMyPosts from "./Views/ViewMyPosts";
import ViewMyLikes from "./Views/ViewMyLikes";

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
            <Route
              path="/MyPosting"
              element={
                <ProtectedRoute>
                  <AddPost />
                </ProtectedRoute>
              }
            />
            <Route path="/MyProfile" element={<MyProfile />} />
            <Route
              path="/MyPosts"
              element={
                <ProtectedRoute>
                  <ViewMyPosts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/MyFavourites"
              element={
                <ProtectedRoute>
                  <ViewMyLikes />
                </ProtectedRoute>
              }
            />
          </Routes>
        </PostsContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
