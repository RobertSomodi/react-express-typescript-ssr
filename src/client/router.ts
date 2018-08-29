import { RouteConfig } from 'react-router-config';

import Root from './root';
import NotFound from './components/notFound';
import Home from './containers/HomeContainer';
import Quiz from './containers/QuizContainer';
import Admin from './containers/AdminContainer';
import requireAuthentication from './containers/RequireAuthentication';
import Login from './containers/LoginContainer';
import Register from './containers/RegisterContainer';

export const routes: RouteConfig[] = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact:true,
        component: requireAuthentication(Home),
      },
      {
        path: '/admin',
        exact:true,
        component: requireAuthentication(Admin),
      },
      {
        path: '/admin/create-quiz',
        exact:true,
        component: requireAuthentication(Quiz)
      },
      {
        path: '/community',
        component: Quiz
      },
      {
        path: '/login',
        exact: true,
        component: Login
      },
      {
        path: '/register',
        exact:true,
        component: Register
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
];
