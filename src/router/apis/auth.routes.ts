import { validateRequest } from '../../core/middlewares/validateRequest';
import authController from '../../core/controllers/auth.controller';
import IRouteGroup from 'src/types/IRouteGroup';
import { userCreateSchema } from '../../core/middlewares/validators/user/create.schema';

export const AuthRoutes: IRouteGroup = {
  group: {
    prefix: '/auth',
  },
  routes: [
    {
      method: 'post',
      path: '/',
      validator: [validateRequest(userCreateSchema)],
      handler: authController.createUser,
    },
  ],
};
