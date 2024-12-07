import IRouteGroup from 'types/IRouteGroup';
import fileManagerController from '../../core/controllers/filemanager.controller';
import sharedMiddleware from '../../core/middlewares/shared.middleware';

export const PublicRoutes: IRouteGroup = {
  group: {
    prefix: '/public',
  },
  routes: [
    {
      method: 'get',
      path: '/shared/view/:fileId',
      middleware: [sharedMiddleware],
      handler: fileManagerController.getFile,
    },
  ],
};
