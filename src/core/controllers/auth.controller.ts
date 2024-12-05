import { Request, Response } from 'express';
import AsyncRouteHandler from 'src/types/AsyncRouteHandler';
import { UsersService } from '../services/user.service';
import HTTP_CODE from '../constants/httpCode';

class AuthController {
  createUser: AsyncRouteHandler = async (_req: Request, res: Response) => {
    const user = await UsersService.create();
    res.status(HTTP_CODE.Created).json(user);
  };
}

export default new AuthController();
