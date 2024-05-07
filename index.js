'use strict';

const {sequelize} = require('./src/auth/models/index.js');

require('dotenv').config();
const {start} = require('./src/server');

sequelize.sync()
  .then(() => {
    start(3000);
  }).catch(e => {
    console.error('Could not start server', e.message);
  });