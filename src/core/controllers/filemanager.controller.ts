/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import fs, { existsSync } from 'fs';
import AsyncRouteHandler from 'types/AsyncRouteHandler';
import HTTP_CODE from '../constants/httpCode';
import logger from '../../utils/logger';
import path from 'path';
import { File } from '../models/file.model';
import getFileType from '../../utils/getFileType';
import filesService from '../services/files.service';
import BaseException from '../exceptions/baseException';
import { MSG_EXCEPTION } from '../constants/messages';
class FileManagerController {
  upload: AsyncRouteHandler = async (req: Request, res: Response) => {
    logger.info('File Uploaded Successfully..');
    const file = req.file;

    if (file) {
      const dataToSave: Partial<File> = {
        filename: file.filename,
        fileOriginalName: file.originalname,
        size: file.size,
        type: getFileType(file.mimetype),
      };

      const { user } = req['user'] as any;
      const payload = await filesService.create(dataToSave, user.id);
      res.status(HTTP_CODE.Ok).json(payload);
    }

    throw new BaseException(MSG_EXCEPTION.OTHER_SOMETHING_WENT_WRONG);
  };
  // FOR DOWNLOADING LARGE FILE USING STREAM
  download: AsyncRouteHandler = async (req: Request, res: Response) => {
    const { fileName } = req.params;

    const filePath = path.join(__dirname, '../../uploads', fileName);

    const stat = fs.statSync(filePath);

    res.writeHead(HTTP_CODE.Ok, {
      'Content-Type': 'application/zip',
      'Content-Length': stat.size,
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });

    const fileStream = fs.createReadStream(filePath);

    fileStream.pipe(res);

    fileStream.on('error', (err) => {
      console.error('Error during file streaming:', err);
      res.status(HTTP_CODE.InternalServerError).send('File streaming failed.');
    });
  };
  createShareLink: AsyncRouteHandler = async (req: Request, res: Response) => {
    const { fileId, isShared } = req.body;
    const payload = await filesService.sharing(fileId, isShared);
    res.status(HTTP_CODE.Ok).json(payload);
  };
  getAllFiles: AsyncRouteHandler = async (req: Request, res: Response) => {
    const { user } = req['user'] as any;
    const payload = await filesService.findAll(user.id);
    res.status(HTTP_CODE.Ok).json(payload);
  };
  getFile: AsyncRouteHandler = async (req: Request, res: Response) => {
    try {
      const { fileId } = req.params;
      const file = await filesService.findOneById(fileId);

      const filePath = path.join(__dirname, '../../uploads', file.filename);

      if (existsSync(filePath)) {
        return res.status(HTTP_CODE.Ok).sendFile(filePath);
      } else {
        throw new Error();
      }
    } catch (error) {
      return res.status(HTTP_CODE.BadRequest).sendFile(error);
    }
  };
}

export default new FileManagerController();
