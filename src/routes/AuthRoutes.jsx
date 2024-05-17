
// project import
import MinimalLayout from "../layout/minimal/MinimalLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

const AuthRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ]
  };
  
  export default AuthRoutes;