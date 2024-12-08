import axios from 'axios';
import { config } from '../config/config';
import { logger } from '../utils/logger';

type Coordinates = [number, number];

export class RouteService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = config.openRouteService.baseUrl;
    this.apiKey = config.openRouteService.apiKey;
  }

  async getOptimalRoute(coordinates: Coordinates[]): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/directions/driving-car/geojson`,
        {
          coordinates: coordinates
        },
        {
          headers: {
            'Authorization': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        route: response.data.features[0],
        summary: {
          distance: response.data.features[0].properties.summary.distance,
          duration: response.data.features[0].properties.summary.duration
        }
      };
    } catch (error) {
      logger.error('Error getting optimal route:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(`API Error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  validateCoordinates(coordinates: Coordinates[]): boolean {
    if (!Array.isArray(coordinates) || coordinates.length < 2) {
      return false;
    }
    
    return coordinates.every(coord => {
      if (!Array.isArray(coord) || coord.length !== 2) {
        return false;
      }
      
      const [lon, lat] = coord;
      return (
        typeof lon === 'number' &&
        typeof lat === 'number' &&
        !isNaN(lon) &&
        !isNaN(lat) &&
        lon >= -180 &&
        lon <= 180 &&
        lat >= -90 &&
        lat <= 90
      );
    });
  }
}

export const routeService = new RouteService();
