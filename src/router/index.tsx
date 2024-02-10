import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "../pages/Layout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import PageNotFound from "../pages/PageNotFound";
import ErrorHandler from "../components/error/ErrorHandler";

const userDataString = localStorage.getItem("userData");
const userData = userDataString ? JSON.parse(userDataString) : null;
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route index element={
          <ProtectedRoute isAllowed={userData?.jwt} redirectPath="/login" data={userData}>
              <HomePage />
            </ProtectedRoute>
        } />
        <Route path="profile" element={
            <ProtectedRoute isAllowed={userData?.jwt} redirectPath="/" data={userData}>
                <h2>Profile</h2>
            </ProtectedRoute>
        } />
        <Route path="login" element={
            <ProtectedRoute isAllowed={!userData?.jwt} redirectPath="/" data={userData}>
                <LoginPage />
            </ProtectedRoute>
        } />
        <Route path="register" element={
            <ProtectedRoute isAllowed={!userData?.jwt} redirectPath="/" data={userData}>
                <RegisterPage />
            </ProtectedRoute>
        } />
      </Route>
      <Route path="*" element={<PageNotFound />}/>
    </>
  )
);

export default router;
