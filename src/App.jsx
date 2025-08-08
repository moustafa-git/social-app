import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserPosts from "./components/UserPosts/UserPosts";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((store) => store.user.token);

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: (
            <ProtectedRoutes isAllowed={!!token === true ? false : true}>
              <Login />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/register",
          element: (
            <ProtectedRoutes isAllowed={!!token === true ? false : true}>
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
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
