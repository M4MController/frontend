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

  apiRouter.get('/objects', function(req, res) {
    // imitate car driving
    movePoint(carPosition);

    res.send({
      'objects': [{'name': 'Mercedes', 'id': 1}],
      'sensors': [
        {
          'controller': 1,
          'name': 'OBD',
          'id': 6,
          'last_value': {'speed': 1, 'engine_load': 2},
          'status': null,
          'type': 5,
        },
        {
          'controller': 1,
          'name': 'GPS',
          'id': 7,
          'last_value': carPosition,
          'status': null,
          'type': 6,
        }],
      'controllers': [
        {
          'name': 'Car controller',
          'id': 1,
          'activation_date': '2019-07-20',
          'mac': '00:25:96:FF:FE:12:34:56',
          'status': 0,
          'deactivation_date': '2019-07-20',
          'object': 1,
          'controller_type': 0,
          'meta': '',
        }],
    });
  });

  app.use('/api', apiRouter);
};
