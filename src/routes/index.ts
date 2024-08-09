/* ===============================================
App Routes - routes/index.ts
1) Entry point to all routes on REST API for ImageIn
2) Use Express Router module
3) User Sharp routes for /api/images API endpoint
================================================== */

// import express module
import express from 'express';

// instantiate express router module
const routes = express.Router();

// import sharpt routes
import sharpRoutes from './sharp_api/sharp_images';

// setup root route
routes.get('/', (req: express.Request, res: express.Response): void => {
  res.status(200).json({ title: 'ImageIn Server Running' });
});

// setup routes to use sharpRoutes
routes.use('/api/images', sharpRoutes);

// export routes for use in other node modules
export default routes;
