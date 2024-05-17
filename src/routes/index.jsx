import { useRoutes } from 'react-router-dom';
import CommonRoutes from './CommonRoutes';
import AuthRoutes from './AuthRoutes';


export default function ThemeRoutes() {
  return (
    useRoutes([ CommonRoutes, AuthRoutes])
  );
}
