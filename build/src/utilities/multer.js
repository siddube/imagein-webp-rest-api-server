"use strict";
/* ========================================================
Multer image upload module - multer.ts
1) Helper function to upload image on the server with multer
=========================================================== */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import multer module
var multer_1 = __importDefault(require("multer"));
// import dotenv module for setting environment variables with .env file
var dotenv_1 = __importDefault(require("dotenv"));
// run dotenv congig
dotenv_1.default.config();
// set env variable from .env file
var ENV = process.env.ENV;
// set and map .png, .jpg and .jpeg to known mime types
var mime_type_map = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
// storage function to wrap multer.diskStorage method
var storage = multer_1.default.diskStorage({
    // provide destination and file name callbacks
    destination: function (req, file, cb) {
        var isValid = mime_type_map[file.mimetype];
        var err = new Error('Invalid Mime Type');
        if (isValid) {
            err = null;
        }
        // run callback with evnronment variable
        if (ENV === 'dev') {
            cb(err, './src/assets/uploads');
        }
        else {
            cb(err, './build/src/assets/uploads');
        }
    },
    filename: function (req, file, cb) {
        var filename = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, "" + filename);
    }
});
// export storage method for use in other node modules
exports.default = storage;
