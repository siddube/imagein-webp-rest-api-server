/* ======================================================================
Sharp API Routes - routes/index.ts
1) Entry point to Sharp API/ WebP converter
2) API responsible for converting .png/ .jpg file formats to .webp format
2) Use Express Router module
3) Make user of utility/ helper modules defined in utilities folder
========================================================================== */

// import express modle
import express from 'express';

// import path module
import path from 'path';

// import multer module for file upload
import multer from 'multer';

// import all the helper functions
import sharpizeImage from '../../utilities/sharpize_image';
import storage from '../../utilities/multer';
import checkBadQueryParam from '../../utilities/check_bad_query_param';
import pathnameGeneratorRootDirectory from '../../utilities/pathname_generator';
import removeFileExtension from '../../utilities/remove_default_extension';

// setup express router module
const sharpRoutes = express.Router();

// define global variables used

// HTTP POST Request to upload image
sharpRoutes.post('/', multer({ storage: storage }).single('image'), (req: express.Request, res: express.Response): void => {
  const uploadedFileName = req?.file?.filename;
  res.status(200).json({ message: 'Image Uploaded on Server', filename: uploadedFileName });
});

// Sharp API GET Request to start conversion to .webp format
sharpRoutes.get('/', (req: express.Request, res: express.Response): void => {
  // variable to store filename from query
  const filename = req.query.filename;

  // variable to hold bad parameter
  // returns true if there is a bad query in the GET Request to Sharp API Route
  const checkBadParamBool = checkBadQueryParam(filename);
  // store filename from query

  // If query has bad params return a 400 bad request as response
  if (checkBadParamBool === true) {
    res.status(400).send(`Bad Request, one of the parameters provided is wrong`);
    return;
  }

  // construct input filepath from filename
  const inputFilepath: string = pathnameGeneratorRootDirectory('uploads', filename);

  // Remove current image file extension to force Sharp API to convert to .webp format
  const outputFileName: string = removeFileExtension(filename as string);
  // construct output filepath path from filename without initial file extension
  const outputFilepath: string = pathnameGeneratorRootDirectory('downloads', `webp_output_${outputFileName}.webp`);

  // Call SharpiseImage module from utility function
  sharpizeImage(inputFilepath, outputFilepath, filename)
    // on successful resolved promise of SharpizeImage method
    // send the converted image filename
    // send image url and to allow download when requested from a client
    .then(() => {
      res.status(200).json({
        filename: `webp_output_${outputFileName}.webp`,
        imageUrl: `${`downloads/webp_output_${outputFileName}.webp`}`
      });
    })
    // on failure or rejected promise
    // send 400 response status
    // with a message that the file does not exist as this is the most probable cause for system failure
    .catch(() => {
      res.status(400).send(`Bad Request, the file does not exist`);
    });
});

// HTTP GET Request to download image
sharpRoutes.get('/downloads/:filename', (req, res) => {
  // get filename as query parameter
  const filename = req.params.filename;
  // store checkBadParamBool with returned value from checkBadQueryParam function
  const checkBadParamBool = checkBadQueryParam(filename);

  // if query has bad params return a 400 bad request as response
  if (checkBadParamBool === true) {
    res.status(400).send(`Bad Request, one of the parameters provided is wrong`);
    return;
  }

  // else download image from path
  res.download(path.join(__dirname, '../../assets/downloads', filename));
});

// export sharp API routes for use in other node modules
export default sharpRoutes;
