import { NextFunction, Request, Response } from 'express';
import Middleware from 'types/Middleware';
import UnauthorizedException from '../exceptions/unauthorized.exception';
import { MSG_EXCEPTION } from '../constants/messages';
import filesService from '../services/files.service';

const sharedMiddleware: Middleware<void> = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { fileId } = req.params as any;
    const isShared = await filesService.isShared(fileId);
    if (isShared) {
      next();
      return;
    } else {
      res.send(new UnauthorizedException(MSG_EXCEPTION.UNAUTHORIZED_ACCESS_TO_SHARED));
    }
  } catch (error) {
    res.send(error);
  }
};
export default sharedMiddleware;
