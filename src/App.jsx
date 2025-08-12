import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserPosts from "./components/UserPosts/UserPosts";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import PostDetail from "./components/PostDetail/PostDetail";

function App() {
  const queryClient = new QueryClient();

  const token = useSelector((store) => store.user.token);

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes
              isAllowed={!!token}
              redirectPath={!!token === true ? "/home" : "/login"}
            >
              <Navigate to={"/home"} />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/login",
          element: (
            <ProtectedRoutes
              isAllowed={!!token === true ? false : true}
              redirectPath={!!token === true ? "/home" : "/login"}
            >
              <Login />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/register",
          element: (
            <ProtectedRoutes isAllowed={!!token === true ? false : true}>
              <ReactQueryDevtools initialIsOpen={false} />
              <Register />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/userposts",
          element: (
            <ProtectedRoutes isAllowed={!!token}>
              <UserPosts />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/post/:postId",
          element: (
            <ProtectedRoutes isAllowed={!!token}>
              <PostDetail />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/home",
          element: (
            <ProtectedRoutes isAllowed={!!token}>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
