import AsyncRouteHandler from 'types/AsyncRouteHandler';
import HTTP_CODE from '../constants/httpCode';
import { Request, Response } from 'express';
import tagsService from '../services/tags.service';

class TagController {
  create: AsyncRouteHandler = async (req: Request, res: Response) => {
    const { tag: tagData, fileId } = req.body;
    const tag = await tagsService.create(tagData, fileId);
    res.status(HTTP_CODE.Created).json(tag);
  };
}

export default new TagController();
