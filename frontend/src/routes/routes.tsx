import { RouteObject } from 'react-router-dom';
import Admin from '../pages/admin/Admin';
import AdminModify from '../pages/admin/AdminModify';
import Home from '../pages/Home';
import Posts from '../pages/posts/Posts';
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
  {
    path: '/auth/admin',
    element: <Admin />,
  },
  {
    path: '/auth/admin/modify-user/:userId',
    element: <AdminModify />,
  },
  {
    path: '/posts',
    element: <Posts posts={[]} />,
  },
];
