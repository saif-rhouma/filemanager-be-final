import authController from '../../core/controllers/auth.controller';
import { userLoginSchema } from '../../core/middlewares/validators/auth/login.schema';
import { userSignUpSchema } from '../../core/middlewares/validators/auth/signup.schema';
import { refreshTokenSchema } from '../../core/middlewares/validators/auth/refresh.token';
import RequestValidator from '../../core/middlewares/requestValidator.middleware';
import authMiddleware from '../../core/middlewares/auth.middleware';
import IRouteGroup from 'types/IRouteGroup';

export const AuthRoutes: IRouteGroup = {
  group: {
    prefix: '/auth',
  },
  routes: [
    {
      method: 'post',
      path: '/login',
      validator: [new RequestValidator(userLoginSchema).body],
      handler: authController.login,
    },
    {
      method: 'post',
      path: '/signup',
      validator: [new RequestValidator(userSignUpSchema).body],
      handler: authController.signUpUser,
    },
    {
      method: 'get',
      path: '/me',
      middleware: [authMiddleware],
      handler: authController.me,
    },
    {
      method: 'post',
      path: '/refresh',
      middleware: [authMiddleware],
      validator: [new RequestValidator(refreshTokenSchema).body],
      handler: authController.refreshToken,
    },
  ],
};
