import { Request, Response } from 'express';
import AsyncRouteHandler from 'src/types/AsyncRouteHandler';
import HTTP_CODE from '../constants/httpCode';
import logger from '../../utils/logger';

class FileManagerController {
  upload: AsyncRouteHandler = async (_req: Request, res: Response) => {
    logger.info('File Uploaded Successfully..');
    res.status(HTTP_CODE.Ok).json('File Uploaded');
  };
}

export default new FileManagerController();
