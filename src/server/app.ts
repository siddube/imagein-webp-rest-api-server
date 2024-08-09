/* ==========================================
App Server - app.ts
1) Entry point to REST API for ImageIn
2) Use Node/ Express to implement REST API
============================================= */

// import express - REST API framework
import express from 'express';

// import cors - Cross Origin Resource Sharing
import cors from 'cors';

// instantiate app as an express module
const app = express();

// set default development port to 3000
const port = 3000;

// setup app to recieve and send HTTP request with json body
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// make use of cors module in the app
app.use(cors());

// setup root route
app.get('/', (req: express.Request, res: express.Response): void => {
  res.status(200).json({ title: 'ImageIn Server Running' });
});

// listen to incoming requests on development port
app.listen(port, (): void => {
  console.log(`ImageIn server running at ${port}`);
});

// export app for use in other node modules
export default app;
