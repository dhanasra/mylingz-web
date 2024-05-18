import { useRoutes } from 'react-router-dom';
import CommonRoutes from './CommonRoutes';
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';


export default function ThemeRoutes() {
  return (
    useRoutes([ CommonRoutes, AuthRoutes, MainRoutes])
  );
}
