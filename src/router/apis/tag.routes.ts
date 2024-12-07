import IRouteGroup from 'types/IRouteGroup';
import authMiddleware from '../../core/middlewares/auth.middleware';
import tagController from '../../core/controllers/tag.controller';

export const TagRoutes: IRouteGroup = {
  group: {
    prefix: '/tag',
    middleware: [authMiddleware],
  },
  routes: [
    {
      method: 'post',
      path: '/',
      handler: tagController.create,
    },
  ],
};
