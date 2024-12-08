import { Request, Response } from 'express';
import { routeService } from '../services/routeService';
import { logger } from '../utils/logger';

export const getOptimalRoute = async (req: Request, res: Response) => {
  try {
    const { coordinates } = req.body;

    if (!routeService.validateCoordinates(coordinates)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid coordinates provided'
      });
    }

    const route = await routeService.getOptimalRoute(coordinates);
    
    logger.info('Route calculated successfully', {
      numberOfPoints: coordinates.length
    });

    return res.status(200).json({
      status: 'success',
      data: route
    });
  } catch (error) {
    logger.error('Error in route optimization:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error calculating optimal route'
    });
  }
};
