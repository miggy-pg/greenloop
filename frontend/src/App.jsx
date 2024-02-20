import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

const Home = lazy(() => import("./modules/Home"));
const Layout = lazy(() => import("./components/Layout"));
const Chat = lazy(() => import("./modules/Chat"));
const Form = lazy(() => import("./modules/Form"));
const Listing = lazy(() => import("./modules/Listing"));
const Post = lazy(() => import("./modules/Post"));
const Profile = lazy(() => import("./modules/Profile"));
const Users = lazy(() => import("./modules/Users"));
const FullPageSpinner = lazy(() => import("./components/FullPageSpinner"));

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
        <Suspense fallback={<FullPageSpinner />}>
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
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
