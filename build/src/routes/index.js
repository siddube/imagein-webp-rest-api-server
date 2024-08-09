"use strict";
/* ===============================================
App Routes - routes/index.ts
1) Entry point to all routes on REST API for ImageIn
2) Use Express Router module
3) User Sharp routes for /api/images API endpoint
================================================== */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express module
var express_1 = __importDefault(require("express"));
// instantiate express router module
var routes = express_1.default.Router();
// import sharpt routes
var sharp_images_1 = __importDefault(require("./sharp_api/sharp_images"));
// setup root route
routes.get('/', function (req, res) {
    res.status(200).json({ title: 'ImageIn Server Running' });
});
// setup routes to use sharpRoutes
routes.use('/api/images', sharp_images_1.default);
// export routes for use in other node modules
exports.default = routes;
