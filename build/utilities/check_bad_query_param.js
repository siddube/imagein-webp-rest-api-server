"use strict";
/* =================================================================
Check bad query parameter helper function - check_bad_query_param.ts
1) Helper function to check validity of the query parameters
==================================================================== */
Object.defineProperty(exports, "__esModule", { value: true });
// check bad query parameter utils function
var checkBadQueryParam = function (filename) {
    // if req.query.file name is not defined or null return true
    // true denotes there is a bad query
    if (filename === undefined || filename === null) {
        return true;
    }
    // else if false the query is a good query to get request
    else {
        return false;
    }
};
// export checkBadQueryParam routes for use in other node modules
exports.default = checkBadQueryParam;
