"use strict";
/* ======================================================================
Remove image file extension helper function - remove_default_extension.ts
1) Helper function to remove default file extension of uploaded image
========================================================================= */
Object.defineProperty(exports, "__esModule", { value: true });
// remove file extension utils function
// find the last dot index which is the dot before file extension
// return filename as sub string before the last dot
//let returnFileName: string = '';
var removeFileExtension = function (fileName) {
    var lastDotIndex = fileName === null || fileName === void 0 ? void 0 : fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
        return fileName;
    }
    return fileName.substring(0, lastDotIndex);
};
// export removeFileExtension method for use in other node modules
exports.default = removeFileExtension;
