import IRouteGroup from 'types/IRouteGroup';
import fileManagerController from '../../core/controllers/filemanager.controller';
import Uploader from '../../core/middlewares/uploader.middleware';
import authMiddleware from '../../core/middlewares/auth.middleware';
export const FileManagerRoutes: IRouteGroup = {
  group: {
    prefix: '/file',
    middleware: [authMiddleware],
  },
  routes: [
    {
      method: 'get',
      path: '/',
      handler: fileManagerController.getAllFiles,
    },
    {
      method: 'post',
      path: '/',
      middleware: [Uploader.single('file')],
      handler: fileManagerController.upload,
    },
    {
      method: 'patch',
      path: '/',
      handler: fileManagerController.createShareLink,
    },
    {
      method: 'get',
      path: '/:fileId',
      handler: fileManagerController.getFile,
    },
  ],
};
