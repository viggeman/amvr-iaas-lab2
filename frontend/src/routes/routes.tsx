import { RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
import UserProfile from '../pages/users/[id]/profile';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/users/:id/profile',
    element: <UserProfile />,
  },
];
