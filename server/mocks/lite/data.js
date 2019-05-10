'use strict';

const carPosition = {lat: 55.751244, lon: 37.618423};

const movePoint = function(point) {
  const maxDelta = 0.005;
  point.lat += (Math.random() - 0.5) * maxDelta;
  point.lon += (Math.random() - 0.5) * maxDelta;
};

module.exports = function(app) {
  const express = require('express');
  const apiRouter = express.Router();

  apiRouter.get('/data', function(req, res) {
    // imitate car driving
    movePoint(carPosition);

    res.send([
      {
        'id': 1,
        'name': 'GPS',
        'last_value': JSON.stringify(carPosition),
        'status': 1,
        'type': 0,
      },
      {
        'id': 2,
        'name': 'OBD',
        'last_value': JSON.stringify({'speed': 1, 'engine_load': 2}),
        'status': 1,
        'type': 0,
      },
    ]);
  });

  app.use('/api', apiRouter);
};
