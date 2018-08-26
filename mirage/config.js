/* eslint-disable no-invalid-this */

import Response from 'ember-cli-mirage/response';

import config from '../config/environment';

export default function() {
  this.namespace = config.APP.backend.namespace;

  [
    ['user', ['objects']],
    ['object', ['user', 'controllers']],
    ['controller', ['object', 'sensors']],
    ['sensor', ['controller', 'data']],
    ['data', 'sensor'],
  ].forEach(([type, relations]) => {
    this.get(`/${type}`);
    this.post(`/${type}`);
    this.get(`/${type}/:id`);

    if (relations) {
      for (let relation of relations) {
        this.get(`/${type}/:id/relationships/${relation}`);
      }
    }
  });

  this.post('/auth/login', (schema, request) => {
    const {username, password} = JSON.parse(request.requestBody);
    if (username === 'admin' && password === 'admin') {
      return new Response(200, {'Content-Type': 'application/json'}, '{"ok": true}');
    } else {
      return new Response(401, {'Content-Type': 'application/json'}, '{"ok": false}');
    }
  });

  this.post('/auth/logout', () => new Response(200, {'Content-Type': 'application/json'}, '{"ok": true}'));
}
