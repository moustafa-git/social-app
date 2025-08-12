import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "./../../User/userSlice";

function Navbar() {
  const token = useSelector((store) => store.user.token);
  const dispatch = useDispatch();
  return (
    <>
      <nav className="navbar bg-base-100 shadow-sm w-[95%] mx-auto">
        <div className="flex-1">
          <Link
            to={"/"}
            className="btn btn-ghost text-xl font-bold text-blue-800"
          >
            Linked Posts
          </Link>
        </div>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {localStorage.getItem("userToken") !== null && token !== null ? (
                <>
                  <li>
                    <NavLink to={"/home"}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/userposts"}>User Posts</NavLink>
                  </li>
                  <li>
                    <Link to={""} onClick={() => dispatch(clearToken())}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to={"/register"}>Register</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/login"}>Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
