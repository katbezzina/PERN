import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationMenu from "./Components/NavigationMenu.tsx";

import LandingPage from "./Views/LandingPage";
import Home from "./Views/Home";
import Login from "./Views/Login.tsx";
import Register from "./Views/Register.tsx";
import Item from "./Views/Item.tsx";

import { PostsContextProvider } from "./Context/PostsContext";

function App() {
  return (
    <Router>
      <PostsContextProvider>
        <NavigationMenu />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Home/:id" element={<Item />} />
        </Routes>
      </PostsContextProvider>
    </Router>
  );
}

export default App;
