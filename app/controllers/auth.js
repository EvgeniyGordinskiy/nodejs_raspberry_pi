const Post = require('../models/Post');
const ServiceProvider = require('../services/serviceProvider');
const Auth = require('../services/auth/auth');

/**
 * POST /login
 * Contact form page.
 */
exports.postLogin = (req, res) => {
  console.log(req.body);
  console.log(new ServiceProvider(Auth));
  res.send('gfod');
};
