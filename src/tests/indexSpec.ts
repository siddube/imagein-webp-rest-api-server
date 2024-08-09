/* ==========================================
Unit Tests - indexSpec.ts
1) Jasmine Unit Test Suite
2) Use Supertest framework
3) Test root route of REST API
============================================= */

// import supertest
import request from 'supertest';

// import app module
import app from '../server/app';

// Test root route
// Tst GET Request
describe('GET /root', function (): void {
  // Check 200 status for root route
  it('App root router responds with a status 200', function (done) {
    request(app).get('/').expect(200, done);
  });
});
