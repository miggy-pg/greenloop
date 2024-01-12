import Form from "./modules/Form";
import Layout from "./components/Layout";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Home from "./modules/Home";
import "./App.css";
import Listing from "./modules/Listing";
import Post from "./modules/Post";
import Profile from "./modules/Profile";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import Chat from "./modules/Chat";
import Users from "./modules/Users";

const ProtectedRoute = ({ children, auth = false }) => {
  const isLoggedIn = localStorage.getItem("user:token") !== null || false;

  if (!isLoggedIn && auth) {
    return <Navigate to={"/users/sign-in"} />;
  } else if (
    isLoggedIn &&
    ["/users/sign-in", "/users/sign-up"].includes(window.location.pathname)
  ) {
    return <Navigate to={"/"} />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/users/sign-in"
          element={
            <ProtectedRoute>
              <Form isSignInPage={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/sign-up"
          element={
            <ProtectedRoute>
              <Form isSignInPage={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute auth={true}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="listing" element={<Listing />} />
          <Route path="post" element={<Post />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chats" element={<Chat />} />
          <Route path="chats/:id" element={<Chat />} />
          <Route path="dashboard/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
