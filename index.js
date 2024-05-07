'use strict';

const sequelize = require('./src/auth/models/index.js');

require('dotenv').config();
const app = require('./src/server');

sequelize.sync()
  .then(() => {
    app.listen(3000, () => console.log('server up'));
  }).catch(e => {
    console.error('Could not start server', e.message);
  });