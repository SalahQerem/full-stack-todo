import toast from "react-hot-toast";
import { NavLink, useLocation } from "react-router-dom";
import Button from "./ui/Button";

const Navbar = () => {
  const userDataString = localStorage.getItem("userData");
  const loggedInUser = userDataString ? JSON.parse(userDataString) : null;
  const { pathname } = useLocation();

  const onLogout = () => {
    localStorage.removeItem("userData");
    toast.success("Logged out!", {
      position: "top-left",
      duration: 1500,
      style: {
        backgroundColor: "black",
        color: "white",
        width: "fit-content",
      },
    });
    setTimeout(() => {
      location.replace(pathname);
    }, 1500);
  };

  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 bg-indigo-600 px-5 py-5 rounded-md">
      <ul className="flex items-center justify-between">
        <li className="text-white font-semibold duration-200 text-lg">
          <NavLink to={"/"}>Home</NavLink>
        </li>
        {loggedInUser ? (
          <p className="flex items-center space-x-5">
            <li className="text-white font-semibold duration-200 text-md">
              <NavLink to={'/profile'}>Profile</NavLink>
            </li>
            <li className="text-white font-semibold duration-200 text-lg">
              <Button onClick={onLogout} className="bg-transparent p-0">Logout</Button>
            </li>
          </p>
        ) : (
          <p className="flex items-center space-x-5">
            <li className="text-white font-semibold duration-200 text-lg">
              <NavLink to={"/register"}>Register</NavLink>
            </li>
            <li className="text-white font-semibold duration-200 text-lg">
              <NavLink to={"/login"}>Login</NavLink>
            </li>
          </p>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
