/* ==========================================
App Routes - routes/index.ts
1) Entry point to all routes on REST API for ImageIn
2) Use Express Router module
============================================= */

// import express module
import express from 'express';

// instantiate express router module
const routes = express.Router();

// setup root route
routes.get('/', (req: express.Request, res: express.Response): void => {
  res.status(200).json({ title: 'ImageIn Server Running' });
});

// export routes for use in other node modules
export default routes;
