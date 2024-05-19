
// project import
import MinimalLayout from "../layout/minimal/MinimalLayout";
import LoginPage from "../pages/auth/LoginPage";
import PasswordForgotPage from "../pages/auth/PasswordForgotPage";
import RegisterPage from "../pages/auth/RegisterPage";

const AuthRoutes = {
  path: '/auth/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <LoginPage />
    },
    {
      path: 'register',
      element: <RegisterPage />
    },
    {
      path: 'password/forgot',
      element: <PasswordForgotPage />
    }
  ]
};

export default AuthRoutes;