const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Users } = require('../models/index');

const basicAuth = async (req, res, next) => {
  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    const user = await Users.findOne({ where: { username: username } });
    if (!user) throw new Error('Invalid User');
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      req.user = user;
      next();
    } else {
      throw new Error('Invalid Password');
    }
  } catch (error) {
    res.status(403).send('Invalid Login');
  }
};

module.exports = basicAuth;
