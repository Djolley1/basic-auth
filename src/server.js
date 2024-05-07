const express = require('express');
const sequelize = require('./auth/models/index.js');
const app = express();

const authRoutes = require('./auth/router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use routes
app.use('/auth', authRoutes);

module.exports = {
  app,
  start: () => {
    sequelize.sync().then(() => {
      app.listen(3000, () => console.log('server up'));
    }).catch(e => {
      console.error('Could not start server', e.message);
    });
  },
};