import { Request, Response } from 'express';
import AsyncRouteHandler from 'src/types/AsyncRouteHandler';
import HTTP_CODE from '../constants/httpCode';
import serializeDTO from '../../utils/serializeDto';
import { AuthSignUpDTO } from '../dtos/auth.signup.dtos';
import authService from '../services/auth.service';
import usersService from '../services/users.service';
import { AuthLoginDTO } from '../dtos/auth.login.dtos';

class AuthController {
  signUpUser: AsyncRouteHandler = async (req: Request, res: Response) => {
    const userData = req.body;
    const user = await authService.signup(userData);
    res.status(HTTP_CODE.Created).json(serializeDTO(AuthSignUpDTO, user));
  };

  login: AsyncRouteHandler = async (req: Request, res: Response) => {
    const userData: { email: string; password: string } = req.body;
    const user = await authService.login(userData.email, userData.password);
    res.status(HTTP_CODE.Ok).json(serializeDTO(AuthLoginDTO, user));
  };

  me: AsyncRouteHandler = async (req: Request, res: Response) => {
    const { email } = req.body;
    const [user] = await usersService.findByEmail(email);
    res.status(HTTP_CODE.Ok).json(serializeDTO(AuthLoginDTO, user));
  };

  refreshToken: AsyncRouteHandler = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const accessToken = await authService.refreshToken(refreshToken);
    res.status(HTTP_CODE.Ok).json(accessToken);
  };
}

export default new AuthController();
