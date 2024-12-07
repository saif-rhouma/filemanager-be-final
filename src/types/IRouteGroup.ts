import { IRoute } from './IRoute';
import Middleware from './Middleware';

export default interface IRouteGroup {
  group: {
    prefix: string;
    middleware?: Middleware<void | unknown>[];
  };
  routes: IRoute[];
}
