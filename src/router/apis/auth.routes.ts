import authController from '../../core/controllers/auth.controller';
import IRouteGroup from 'src/types/IRouteGroup';
import { userLoginSchema } from '../../core/middlewares/validators/user/login.schema';
import { userSignUpSchema } from '../../core/middlewares/validators/user/signup.schema';
import RequestValidator from '../../core/middlewares/requestValidator.middleware';

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
  ],
};
