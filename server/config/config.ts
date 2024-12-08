export const config = {
  openRouteService: {
    apiKey: process.env.ORS_API_KEY || '',
    baseUrl: 'https://api.openrouteservice.org/v2',
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    }
  },
  server: {
    port: 8000
  }
};
