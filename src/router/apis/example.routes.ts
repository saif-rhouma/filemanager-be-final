import authMiddleware from '../../core/middlewares/auth.middleware';
import exampleController from '../../core/controllers/example.controller';
import IRouteGroup from 'src/types/IRouteGroup';

export const ExampleRoutes: IRouteGroup = {
  group: {
    prefix: '/example',
  },
  routes: [
    {
      method: 'get',
      path: '/',
      handler: exampleController.public,
    },
    {
      method: 'get',
      path: '/protected',
      middleware: [authMiddleware],
      handler: exampleController.authProtected,
    },
  ],
};
