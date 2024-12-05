/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTTPRequestMethod } from './HTTPRequestMethod';
import AsyncRouteHandler from './AsyncRouteHandler';

export interface IRoute {
  method: HTTPRequestMethod;
  path: string;
  middleware?: [];
  validator?: any[];
  handler: AsyncRouteHandler;
}
