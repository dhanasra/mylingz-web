import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import CommonRoutes from './CommonRoutes';
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import { LocalDB, USER, USER_ID } from '../network/db/local_db';
import { useEffect } from 'react';
import { AppRoutes } from './Routes';


const CheckAuthAndStorage = ({ children }) => {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  useEffect(() => {

    const user = LocalDB.getItem(USER)
    const userId = LocalDB.getItem(USER_ID)

    const authRoute = currentLocation.pathname.includes('auth/');
    const appRoutes = currentLocation.pathname.includes('app/');

    if(authRoute && user && userId){
      navigate(AppRoutes.links);
    }else if(appRoutes && !(user && userId)){
      navigate(AppRoutes.login);
    }
    
  }, [navigate, currentLocation]);

  return <>{children}</>;
};

export default function ThemeRoutes() {
  return (
    <CheckAuthAndStorage>
     { useRoutes([ CommonRoutes, AuthRoutes, MainRoutes]) }
    </CheckAuthAndStorage>
  );
}
