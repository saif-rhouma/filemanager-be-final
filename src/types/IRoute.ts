import { HTTPRequestMethod } from './HTTPRequestMethod';
import AsyncRouteHandler from './AsyncRouteHandler';

export interface IRoute {
  method: HTTPRequestMethod;
  path: string;
  middleware: [];
  handler: AsyncRouteHandler;
}
