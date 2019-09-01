"use strict";

const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const BaseService = require('../baseService');
const User = require('../../models/User');

class AuthService extends BaseService {

  constructor() {
    super();
    this.privateKEY  = fs.readFileSync(__dirname + '/node_js_raspberry_pi.pem', 'utf8');
    this.publicKEY  = fs.readFileSync(__dirname + '/node_js_raspberry_pi.pub', 'utf8');
    this.expireTime = 5000;
  }
  async authenticate ({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { hash, ...userWithoutHash } = user.toObject();
      const token = jwt.sign({ sub: user.id }, this.privateKEY, { expiresIn: this.expireTime });
      return {
        user: userWithoutHash,
        token: token,
        status: AuthService.success
      };
    } else {
      return {
        status: AuthService.invalidCredentials
      }
    }
  }

  async register(body) {
    try {
      const user = await User.create({
        email: body.email,
        password: body.password,
      });
      const token = jwt.sign({ sub: user.id }, this.privateKEY, { expiresIn: this.expireTime });
      return {
        token: token,
        user: user,
        status: AuthService.success
      }
    } catch (err) {
      console.log(err);
      return {
        status: AuthService.serverError
      }
    }
  }

  async validate(token) {
      try {
        const resp = jwt.verify(token, this.publicKEY);
        console.log(resp);
        return AuthService.success;
      } catch (err) {
        console.log(err);
        return AuthService.serverError;
      }
  }
}

// Response statuses
AuthService.success = 0;
AuthService.userNotFound = 1;
AuthService.invalidCredentials = 2;
AuthService.serverError = 3;

module.exports = AuthService;
