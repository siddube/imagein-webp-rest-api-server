"use strict";
/* ============================================
Capitalize word helper function - capitalize.ts
1) Helper function to capitalize file name
=============================================== */
Object.defineProperty(exports, "__esModule", { value: true });
// capitalize word utils function
var capitalizeWord = function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
};
// export capitalizeWord routes for use in other node modules
exports.default = capitalizeWord;
