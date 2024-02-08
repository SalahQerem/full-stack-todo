import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "../pages/Layout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import PageNotFound from "../pages/PageNotFound";
import ErrorHandler from "../components/error/ErrorHandler";
const isLoggedIn = false;
const userData: { email: string } | null = isLoggedIn ? { email: "enail@email.com" } : null;
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route index element={
          <ProtectedRoute isAllowed={isLoggedIn} redirectPath="/login" data={userData}>
              <HomePage />
            </ProtectedRoute>
        } />
        <Route path="login" element={
            <ProtectedRoute isAllowed={!isLoggedIn} redirectPath="/" data={userData}>
                <LoginPage />
            </ProtectedRoute>
        } />
        <Route path="register" element={
            <ProtectedRoute isAllowed={!isLoggedIn} redirectPath="/" data={userData}>
                <RegisterPage />
            </ProtectedRoute>
        } />
      </Route>
      <Route path="*" element={<PageNotFound />}/>
    </>
  )
);

export default router;
