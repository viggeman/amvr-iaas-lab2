import { RouteObject } from 'react-router-dom';
import Admin from '../pages/Admin';
import Home from '../pages/Home';
import Posts from '../pages/posts/Posts';
import UserProfile from '../pages/users/[id]/profile';

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
  {
    path: '/posts',
    element: <Posts />,
  },
];
