import express, { Express, Router as IRouter } from 'express';

import { AuthRoutes } from './apis/auth.routes';
import { ExampleRoutes } from './apis/example.routes';
import { FileManagerRoutes } from './apis/filemanager.routes';
import { TagRoutes } from './apis/tag.routes';
import { PublicRoutes } from './apis/public.routes';
import HTTP_CODE from '../core/constants/httpCode';
import IRouteGroup from '../types/IRouteGroup';
import runAsyncWrapper from '../utils/runAsyncWrapper';
import NotFoundException from '../core/exceptions/notFound.exception';
import { MSG_EXCEPTION } from '../core/constants/messages';

class Router {
  router: IRouter;
  authRoutes: IRouteGroup;
  exampleRoutes: IRouteGroup;
  fileManagerRoutes: IRouteGroup;
  tagRoutes: IRouteGroup;
  publicRoutes: IRouteGroup;

  constructor() {
    this.router = express.Router();
    this.authRoutes = AuthRoutes;
    this.exampleRoutes = ExampleRoutes;
    this.fileManagerRoutes = FileManagerRoutes;
    this.tagRoutes = TagRoutes;
    this.publicRoutes = PublicRoutes;
  }

  public create(app: Express) {
    // TODO : attach middleware
    this._handleFileManagerAPI();
    this._handlePublicAPI();
    this._handleTagAPI();
    this._handleAuthAPI();
    // TEST API START
    this._handleExampleAPI();
    // TEST API END
    this._handleExceptions();
    this._handlePageNotFound();
    app.use(this.router);
  }

  private _handlePageNotFound() {
    const MSG_SERVER_WELCOME = 'Route Not Found However - Challenge Backend Say Hello World!';
    this.router.all('*', async (_req, res) => {
      res
        .status(HTTP_CODE.NotFound)
        .json(
          new NotFoundException(MSG_EXCEPTION.NOT_FOUND_ROUTE, HTTP_CODE.NotFound, { context: MSG_SERVER_WELCOME })
        );
    });
  }

  private _handleExceptions() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.router.use((err, _req, res, _next) => {
      err.statusCode = err.status || err.statusCode || HTTP_CODE.InternalServerError;
      return res.status(err.statusCode).json({
        errorCode: err.message,
        statusCode: err.status,
        details: err.details,
      });
    });
  }

  private _attachRoutes(routeGroup: IRouteGroup, prefix: string = '') {
    [routeGroup].forEach(({ group, routes }) => {
      routes.forEach(({ method, path, middleware = [], validator = [], handler }) => {
        this.router[method](
          prefix + group.prefix + path,
          [...(group.middleware || []), ...middleware],
          [...validator],
          runAsyncWrapper(handler)
        );
      });
    });
  }

  //! Apis Routes

  private _handlePublicAPI() {
    this._attachRoutes(this.publicRoutes, '/api');
  }

  private _handleTagAPI() {
    this._attachRoutes(this.tagRoutes, '/api');
  }

  private _handleAuthAPI() {
    this._attachRoutes(this.authRoutes, '/api');
  }

  private _handleExampleAPI() {
    this._attachRoutes(this.exampleRoutes, '/api/test');
  }

  private _handleFileManagerAPI() {
    this._attachRoutes(this.fileManagerRoutes, '/api');
  }
}

export default new Router();
