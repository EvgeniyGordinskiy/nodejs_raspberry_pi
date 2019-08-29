"use strict";

const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const BaseService = require('../baseService');

module.exports =  class Auth extends BaseService {

  constructor() {
    super()
    this.privateKEY  = fs.readFileSync('./node_js_raspberry_pi.key', 'utf8');
    this.publicKEY  = fs.readFileSync('./node_js_raspberry_pi.key.pub', 'utf8');
  }
  async authenticate ({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { hash, ...userWithoutHash } = user.toObject();
      const token = jwt.sign({ sub: user.id }, config.secret);
      return {
        ...userWithoutHash,
        token
      };
    }
  }
};
