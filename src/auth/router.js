const express = require('express');
const basicAuth = require('./middleware/basic.js');
const { userModel } = require('./models/index.js');

const router = express.Router();

//Signup
router.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await userModel.create(req.body);
    res.status(201).json(record);
  } catch (e) {
    res.status(400).send('Error Creating User');
  }
});

//Signin 
router.post('/signin', basicAuth, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;