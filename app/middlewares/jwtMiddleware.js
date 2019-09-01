const ServiceProvider = require('../services/serviceProvider');
const AuthService = require('../services/authService/authService');
const ResponseService = require('../services/responseService/responseService');

module.exports = async (req, res, next) => {
    let tokenToVerify;
    const responseService = await ServiceProvider.getService(ResponseService, res);
    if (req.header('Authorization')) {
        const parts = req.header('Authorization').split(' ');

        if (parts.length === 2) {
            const scheme = parts[0];
            const credentials = parts[1];

            if (/^Bearer$/.test(scheme)) {
                tokenToVerify = credentials;
            } else {
                return responseService.unauthorized('Format for Authorization: Bearer [token]' );
            }
        } else {
            return responseService.unauthorized('Format for Authorization: Bearer [token]' );
        }
    } else if (req.body.token) {
        tokenToVerify = req.body.token;
        delete req.query.token;
    } else {
        return responseService.unauthorized('No Authorization was found' );
    }
    const resp = await ServiceProvider.getService(AuthService).verify(tokenToVerify);
    if (resp.status === AuthService.success) {
        return next();
    } else {
        return responseService.unauthorized(resp.msg);
    }
};
