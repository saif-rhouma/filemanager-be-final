import AsyncRouteHandler from 'src/types/AsyncRouteHandler';
import HTTP_CODE from '../constants/httpCode';
import { Request, Response } from 'express';

class ExampleController {
  authProtected: AsyncRouteHandler = async (_req: Request, res: Response) => {
    res.status(HTTP_CODE.Ok).json('Protected Route TEST');
  };

  public: AsyncRouteHandler = async (_req: Request, res: Response) => {
    res.status(HTTP_CODE.Ok).json('Public Route TEST');
  };
}

export default new ExampleController();
