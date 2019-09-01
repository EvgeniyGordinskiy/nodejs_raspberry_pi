const ServiceProvider = require('../services/serviceProvider');
const AuthService = require('../services/authService/authService');
const ResponseService = require('../services/responseService/responseService');
/**
 * POST /login
 * Contact form page.
 */
exports.postLogin = async (req, res) => {
  console.log(req.body);
  const resp = await ServiceProvider.getService(AuthService).authenticate(req.body);
  if (resp.status === AuthService.success && resp.token) {
    return await ServiceProvider.getService(ResponseService, res).success(resp);
  }
  if (resp.status === AuthService.invalidCredentials) {
    return await ServiceProvider.getService(ResponseService, res).unauthorized("Incorrect email or password");
  }
  return await ServiceProvider.getService(ResponseService, res).respondWithError();
};
/**
 * POST /register
 * Contact form page.
 */
exports.postRegister = async (req, res) => {
  console.log(req.body);
  const resp = await ServiceProvider.getService(AuthService).register(req.body);
  if (resp.status === AuthService.success && resp.token) {
    return await ServiceProvider.getService(ResponseService, res).success(resp);
  }
  return await ServiceProvider.getService(ResponseService, res).respondWithError();
};

exports.validate = async (req, res) => {
  const { token } = req.body;
  const resp = await ServiceProvider.getService(AuthService).validate(token);
  if (resp.status === AuthService.success) {
    return await ServiceProvider.getService(ResponseService, res).success();
  }
};
