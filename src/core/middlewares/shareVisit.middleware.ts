import { NextFunction, Request, Response } from 'express';
import Middleware from 'types/Middleware';
import UnauthorizedException from '../exceptions/unauthorized.exception';
import { MSG_EXCEPTION } from '../constants/messages';
import filesService from '../services/files.service';

const shareVisitMiddleware: Middleware<void> = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { fileId } = req.params as any;
    const file = await filesService.findOneById(fileId);
    if (file) {
      await filesService.incrementView(file);
      next();
      return;
    } else {
      res.json(new UnauthorizedException(MSG_EXCEPTION.NOT_FOUND_FILE));
    }
  } catch (error) {
    res.json(error);
  }
};
export default shareVisitMiddleware;
