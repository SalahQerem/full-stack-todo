import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const layout = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default layout;
