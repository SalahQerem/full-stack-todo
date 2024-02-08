import { NavLink } from "react-router-dom";

interface IProps {}

const Navbar = ({}: IProps) => {
  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 bg-indigo-600 px-5 py-5 rounded-md">
      <ul className="flex items-center justify-between">
        <li className="text-white font-semibold duration-200 text-lg">
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <p className="flex items-center space-x-5">
          <li className="text-white font-semibold duration-200 text-lg">
            <NavLink to={"/register"}>Register</NavLink>
          </li>
          <li className="text-white font-semibold duration-200 text-lg">
            <NavLink to={"/login"}>Login</NavLink>
          </li>
        </p>
      </ul>
    </nav>
  );
};

export default Navbar;
