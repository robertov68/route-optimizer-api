import type { Express } from "express";
import { validateRouteRequest } from './middleware/validator';
import { rateLimiter } from './middleware/rateLimiter';
import { getOptimalRoute } from './controllers/routeController';

export function registerRoutes(app: Express) {
  // Health check
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // Route optimization endpoint
  app.post(
    '/api/optimize-route',
    rateLimiter,
    validateRouteRequest,
    getOptimalRoute
  );
}
