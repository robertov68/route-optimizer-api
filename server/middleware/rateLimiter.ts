import rateLimit from 'express-rate-limit';
import { config } from '../config/config';

export const rateLimiter = rateLimit({
  windowMs: config.openRouteService.rateLimit.windowMs,
  max: config.openRouteService.rateLimit.max,
  message: {
    status: 'error',
    message: 'Demasiadas solicitudes, por favor intente más tarde.'
  }
});
