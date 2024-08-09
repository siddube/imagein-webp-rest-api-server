"use strict";
/* =================================================================
Pathname Generator helper function - pathname_generator.ts
1) Helper function to generate paths to upload and download images
==================================================================== */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import path
var path_1 = __importDefault(require("path"));
// declare returnPathName as a string variable
var returnPathName;
// generate path utils function
// accpet directory and filename to construct path and return it
var pathnameGeneratorRootDirectory = function (directory, filename) {
    returnPathName = path_1.default.join(__dirname, "../assets/" + directory + "/" + filename);
    return returnPathName;
};
// export pathnameGeneratorRootDirectory method for use in other node modules
exports.default = pathnameGeneratorRootDirectory;
