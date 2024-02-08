import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  isAllowed: boolean;
  redirectPath: string;
  children: ReactNode;
  data?: unknown;
}

const ProtectedRoute = ({ isAllowed, redirectPath, children, data }: IProps) => {
  if (isAllowed) {
    return children;
  }
  return <Navigate to={redirectPath} replace state={data} />;
};

export default ProtectedRoute;
