import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const coordinateSchema = z.tuple([
  z.number().min(-180).max(180),
  z.number().min(-90).max(90)
]);

const routeRequestSchema = z.object({
  coordinates: z.array(coordinateSchema).min(2).max(50)
});

export const validateRouteRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    routeRequestSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid coordinates format',
        details: error.errors
      });
    }
    next(error);
  }
};
