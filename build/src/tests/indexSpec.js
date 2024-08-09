"use strict";
/* ==========================================
Unit Tests - indexSpec.ts
1) Jasmine Unit Test Suite
2) Use Supertest framework
3) Test root route of REST API
============================================= */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import supertest
var supertest_1 = __importDefault(require("supertest"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
// import app module
var app_1 = __importDefault(require("../server/app"));
var sharpize_image_1 = __importDefault(require("../utilities/sharpize_image"));
// test root (/) route
// test GET Request
describe('GET /root', function () {
    // Check 200 status for root route
    it('App root router responds with a status 200', function (done) {
        supertest_1.default(app_1.default).get('/').expect(200, done);
    });
});
// test /api/images route
// test GET Request
describe('Test GET /api/images with query parameters', function () {
    // expect 200 OK status on provinding right query parameters
    it('Images API router responds with a status 200 on providing right query parameters', function (done) {
        supertest_1.default(app_1.default).get('/api/images?filename=hendrix.jpg').expect(200, done);
    });
    // expect 400 bad request status on provinding wrong query parameters
    it('Images API router responds with a status 400 on bad request due to wrong query parameter name', function (done) {
        supertest_1.default(app_1.default).get('/api/images?wrong_param=hendrix.jpg').expect(400, done);
    });
    // expect 400 bad request status if image does not exsit
    it('Images API router responds with a status 400 on bad request due to missing file', function (done) {
        supertest_1.default(app_1.default).get('/api/images?filename=missingfile').expect(400, done);
    });
});
// test /api/images route
// test converter functionality
describe('Test sharp functionality', function () {
    // expect sharpizeImage to be resolved to true on provinding right query parameters
    it('Serves a .webp converted image on passing the right query paramaters', function () {
        var bool;
        sharpize_image_1.default(path_1.default.join(__dirname, "../assets/uploads/hendrix.jpg"), path_1.default.join(__dirname, "../assets/downloads/webp_output_hendrix.webp"), 'hendrix').then(function () {
            bool = fs_1.default.accessSync(path_1.default.join(__dirname, "../assets/downloads/webp_output_hendrix.webp"));
        });
        expect(bool).toBeTruthy;
    });
    // expect sharpizeImage to be rejected and to be false on provinding right query parameters
    it('Rejects image resize on passing the bad query paramaters', function () {
        var bool;
        sharpize_image_1.default(path_1.default.join(__dirname, "../assets/uploads/missing.jpg"), path_1.default.join(__dirname, "../assets/downloads/webp_output_hendrix.webp"), 'missing').catch(function () {
            bool = fs_1.default.accessSync(path_1.default.join(__dirname, "../assets/downloads/webp_output_hendrix.webp"));
        });
        expect(bool).toBeFalsy;
    });
});
