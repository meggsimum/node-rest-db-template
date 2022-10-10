import { describe, it } from 'mocha';
import request from 'supertest';
import server from '../index.js';
// import logger from '../util/logger.js';
// import js from '../util/js.js';

const path = '/api/places';

describe(path, function () {
  it('GET responds with 200', function (done) {
    request(server)
      .get(path)
      .expect(200, done);
  });

  it('POST returns JSON from request body', function (done) {
    const data = {
      name: 'Place test'
    };

    request(server)
      .post(path)
      .set('Content-Type', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        res.body.id = 1;
        res.body.name = data.name;
      })
      .expect(201, done);
  });

  it('PUT responds with 200', function (done) {
    const data = {
      id: 1,
      name: 'Place test'
    };
    request(server)
      .put(path)
      .set('Content-Type', 'application/json')
      .send(data)
      .expect(200, done);
  });
});

describe(path + '/:id', function () {
  it('GET responds with 200', function (done) {
    request(server)
      .get(path + '/1')
      .expect(200, done);
  });

  it('DELETE responds with 200', function (done) {
    request(server)
      .delete(path + '/1')
      .expect(200, done);
  });
});
