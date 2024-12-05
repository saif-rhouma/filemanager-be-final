import express, { Express, Router as IRouter } from 'express';

import HTTP_CODE from '@constants/httpCode';
import IRouteGroup from '@tsTypes/IRouteGroup';
import runAsyncWrapper from '@utils/runAsyncWrapper';

class Router {
  router: IRouter;
  constructor() {
    this.router = express.Router();
  }

  public create(app: Express) {
    // TODO : attach middleware
    // this._attachApiRoutes();
    this._handlePageNotFound();
    this._handleExceptions();
    app.use(this.router);
  }

  private _handlePageNotFound() {
    this.router.all('*', async (_req, res) => {
      res.status(HTTP_CODE.NotFound).send('Page Not Found');
    });
  }

  private _handleExceptions() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.router.use((err, _req, res, _next) => {
      err.statusCode = err.status || err.statusCode || HTTP_CODE.InternalServerError;
      return res.status(err.statusCode).send(err.message);
    });
  }

  private _attachRoutes(routeGroup: IRouteGroup, prefix: string = '') {
    [routeGroup].forEach(({ group, routes }) => {
      routes.forEach(({ method, path, middleware = [], handler }) => {
        this.router[method](
          prefix + group.prefix + path,
          [...(group.middleware || []), ...middleware],
          runAsyncWrapper(handler)
        );
      });
    });
  }
}

export default new Router();
