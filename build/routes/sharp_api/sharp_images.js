"use strict";
/* ======================================================================
Sharp API Routes - routes/index.ts
1) Entry point to Sharp API/ WebP converter
2) API responsible for converting .png/ .jpg file formats to .webp format
2) Use Express Router module
3) Make user of utility/ helper modules defined in utilities folder
========================================================================== */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express modle
var express_1 = __importDefault(require("express"));
// import path module
var path_1 = __importDefault(require("path"));
// import multer module for file upload
var multer_1 = __importDefault(require("multer"));
// import all the helper functions
var sharpize_image_1 = __importDefault(require("../../utilities/sharpize_image"));
var multer_2 = __importDefault(require("../../utilities/multer"));
var check_bad_query_param_1 = __importDefault(require("../../utilities/check_bad_query_param"));
var pathname_generator_1 = __importDefault(require("../../utilities/pathname_generator"));
var remove_default_extension_1 = __importDefault(require("../../utilities/remove_default_extension"));
// setup express router module
var sharpRoutes = express_1.default.Router();
// define global variables used
// HTTP POST Request to upload image
sharpRoutes.post('/', multer_1.default({ storage: multer_2.default }).single('image'), function (req, res) {
    var _a;
    var uploadedFileName = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    res.status(200).json({ message: 'Image Uploaded on Server', filename: uploadedFileName });
});
// Sharp API GET Request to start conversion to .webp format
sharpRoutes.get('/', function (req, res) {
    // variable to store filename from query
    var filename = req.query.filename;
    // variable to hold bad parameter
    // returns true if there is a bad query in the GET Request to Sharp API Route
    var checkBadParamBool = check_bad_query_param_1.default(filename);
    // store filename from query
    // If query has bad params return a 400 bad request as response
    if (checkBadParamBool === true) {
        res.status(400).send("Bad Request, one of the parameters provided is wrong");
        return;
    }
    // construct input filepath from filename
    var inputFilepath = pathname_generator_1.default('uploads', filename);
    // Remove current image file extension to force Sharp API to convert to .webp format
    var outputFileName = remove_default_extension_1.default(filename);
    // construct output filepath path from filename without initial file extension
    var outputFilepath = pathname_generator_1.default('downloads', "webp_output_" + outputFileName + ".webp");
    // Call SharpiseImage module from utility function
    sharpize_image_1.default(inputFilepath, outputFilepath, filename)
        // on successful resolved promise of SharpizeImage method
        // send the converted image filename
        // send image url and to allow download when requested from a client
        .then(function () {
        res.status(200).json({
            filename: "webp_output_" + outputFileName + ".webp",
            imageUrl: "" + ("downloads/webp_output_" + outputFileName + ".webp")
        });
    })
        // on failure or rejected promise
        // send 400 response status
        // with a message that the file does not exist as this is the most probable cause for system failure
        .catch(function () {
        res.status(400).send("Bad Request, the file does not exist");
    });
});
// HTTP GET Request to download image
sharpRoutes.get('/downloads/:filename', function (req, res) {
    // get filename as query parameter
    var filename = req.params.filename;
    // store checkBadParamBool with returned value from checkBadQueryParam function
    var checkBadParamBool = check_bad_query_param_1.default(filename);
    // if query has bad params return a 400 bad request as response
    if (checkBadParamBool === true) {
        res.status(400).send("Bad Request, one of the parameters provided is wrong");
        return;
    }
    // else download image from path
    res.download(path_1.default.join(__dirname, '../../assets/downloads', filename));
});
// export sharp API routes for use in other node modules
exports.default = sharpRoutes;
