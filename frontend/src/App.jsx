import { Routes, Route, Navigate } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

import Layout from "./components/Layout";
import Chat from "./modules/Chat";
import Form from "./modules/Form";
import Home from "./modules/Home";
import Listing from "./modules/Listing";
// import MobileNotification from "./modules/Notification/MobileNotification.jsx";
import Post from "./modules/Post";
import Profile from "./modules/Profile";
import Users from "./modules/Users";

import "./App.css";

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

const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 60 * 1000,
  },
});

const App = () => {
  // const hideModals = useSelector((state) => state.ui.hideModals);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
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
            {/* {!hideModals && (
          <Route path="notifications" element={<MobileNotification />} />
        )} */}
            <Route path="dashboard/users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
