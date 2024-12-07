import { Response, Request, NextFunction } from 'express';
import Middleware from 'types/Middleware';

import { AnyZodObject, ZodError } from 'zod';

class RequestValidator {
  private schema: AnyZodObject;

  constructor(schema: AnyZodObject) {
    this.schema = schema;
  }

  private _validator(req: Request, res: Response, next: NextFunction, type: 'body' | 'query' | 'params') {
    try {
      this.schema.parse(req[type]);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public body: Middleware<void> = (req: Request, res: Response, next: NextFunction) => {
    this._validator(req, res, next, 'body');
  };

  public query: Middleware<void> = (req: Request, res: Response, next: NextFunction) => {
    this._validator(req, res, next, 'query');
  };

  public params: Middleware<void> = (req: Request, res: Response, next: NextFunction) => {
    this._validator(req, res, next, 'params');
  };
}
export default RequestValidator;
