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
// import app module
var app_1 = __importDefault(require("../server/app"));
// Test root route
// Tst GET Request
describe('GET /root', function () {
    // Check 200 status for root route
    it('App root router responds with a status 200', function (done) {
        supertest_1.default(app_1.default).get('/').expect(200, done);
    });
});
