import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import HTTP_CODE from '../constants/httpCode';
import Middleware from 'src/types/Middleware';

/**
 * Middleware to validate request bodies using a Zod schema
 * @param schema Zod schema to validate against
 */
export const validateRequest = (schema: ZodSchema): Middleware<void> => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(HTTP_CODE.NotAcceptable).json({
          message: 'Validation error',
          errors: error.errors,
        });
      }
      next(error);
    }
  };
};
