import { Response, Request, NextFunction } from 'express';
import Middleware from 'src/types/Middleware';
import { AnyZodObject, ZodError } from 'zod';

class RequestValidator {
  private schema: AnyZodObject;

  constructor(schema: AnyZodObject) {
    this.schema = schema;
  }
  // The middleware method that will be used in routes
  public body: Middleware<void> = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.schema.parse(req.body);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}
export default RequestValidator;
