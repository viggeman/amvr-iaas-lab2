import { RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
import UserProfile from '../pages/users/[id]/profile';
import Admin from '../pages/Admin';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/users/:name/profile',
    element: <UserProfile />,
  },
  {
    path: '/auth/admin',
    element: <Admin />,
  },
];
