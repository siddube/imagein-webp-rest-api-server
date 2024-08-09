/* ==========================================
Unit Tests - indexSpec.ts
1) Jasmine Unit Test Suite
2) Use Supertest framework
3) Test root route of REST API
============================================= */

// import supertest
import request from 'supertest';

import path from 'path';
import fs from 'fs';

// import app module
import app from '../server/app';

import sharpizeImage from '../utilities/sharpize_image';

// test root (/) route
// test GET Request
describe('GET /root', function (): void {
  // Check 200 status for root route
  it('App root router responds with a status 200', function (done) {
    request(app).get('/').expect(200, done);
  });
});

// test /api/images route
// test GET Request
describe('Test GET /api/images with query parameters', function (): void {
  // expect 200 OK status on provinding right query parameters
  it('Images API router responds with a status 200 on providing right query parameters', function (done) {
    request(app).get('/api/images?filename=hendrix.jpg').expect(200, done);
  });

  // expect 400 bad request status on provinding wrong query parameters
  it('Images API router responds with a status 400 on bad request due to wrong query parameter name', function (done) {
    request(app).get('/api/images?wrong_param=hendrix.jpg').expect(400, done);
  });

  // expect 400 bad request status if image does not exsit
  it('Images API router responds with a status 400 on bad request due to missing file', function (done) {
    request(app).get('/api/images?filename=missingfile').expect(400, done);
  });
});

// test /api/images route
// test converter functionality
describe('Test sharp functionality', function (): void {
  // expect sharpizeImage to be resolved to true on provinding right query parameters
  it('Serves a .webp converted image on passing the right query paramaters', function () {
    var bool;
    sharpizeImage(path.join(__dirname, `../assets/uploads/hendrix.jpg`), path.join(__dirname, `../assets/downloads/webp_output_hendrix.webp`), 'hendrix').then(() => {
      bool = fs.accessSync(path.join(__dirname, `../assets/downloads/webp_output_hendrix.webp`));
    });
    expect(bool).toBeTruthy;
  });

  // expect sharpizeImage to be rejected and to be false on provinding right query parameters
  it('Rejects image resize on passing the bad query paramaters', function () {
    var bool;
    sharpizeImage(path.join(__dirname, `../assets/uploads/missing.jpg`), path.join(__dirname, `../assets/downloads/webp_output_hendrix.webp`), 'missing').catch(() => {
      bool = fs.accessSync(path.join(__dirname, `../assets/downloads/webp_output_hendrix.webp`));
    });
    expect(bool).toBeFalsy;
  });
});
