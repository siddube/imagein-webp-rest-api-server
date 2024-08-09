"use strict";
/* ==========================================
App Server - app.ts
1) Entry point to REST API for ImageIn
2) Use Node/ Express to implement REST API
============================================= */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express - REST API framework
var express_1 = __importDefault(require("express"));
// import cors - Cross Origin Resource Sharing
var cors_1 = __importDefault(require("cors"));
// instantiate app as an express module
var app = express_1.default();
// set default development port to 3000
var port = 3000;
// setup app to recieve and send HTTP request with json body
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
// make use of cors module in the app
app.use(cors_1.default());
// setup root route
app.get('/', function (req, res) {
    res.status(200).json({ title: 'ImageIn Server Running' });
});
// listen to incoming requests on development port
app.listen(port, function () {
    console.log("ImageIn server running at " + port);
});
// export app for use in other node modules
exports.default = app;
