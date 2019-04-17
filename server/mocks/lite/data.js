'use strict';

const sensors = [
  {
    'id': 1,
    'name': 'GPS',
    'last_value': JSON.stringify({"lat": 1, "lon": 2}),
    'status': 1,
    'type': 0,
  },
  {
    'id': 2,
    'name': 'OBD',
    'last_value': JSON.stringify({"some": 1, "values": 2}),
    'status': 1,
    'type': 0,
  },
];

module.exports = function(app) {
  const express = require('express');
  let apiRouter = express.Router();

  apiRouter.get('/data', function(req, res) {
    res.send(sensors);
  });

  app.use('/api', apiRouter);
};
