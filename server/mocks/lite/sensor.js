'use strict';

module.exports = function(app) {
  const express = require('express');
  let apiRouter = express.Router();

  apiRouter.get('/sensor/:sensor_id/data', function(req, res) {
    const maxDelta = 5;
    const data = [];
    let date = new Date();
    for (let i = 0; i < 1000; ++i) {
      date.setMinutes(date.getMinutes() + 1);
      data.push({'date': date.toISOString(), 'value': {[req.query['field']]: Math.sin(i / 50) * (Math.random() - 0.5) * maxDelta}});
    }
    res.send(data);
  });

  app.use('/api', apiRouter);
};
