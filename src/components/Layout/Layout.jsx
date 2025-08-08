import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ProtectedRoutes from "./../ProtectedRoutes/ProtectedRoutes";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
