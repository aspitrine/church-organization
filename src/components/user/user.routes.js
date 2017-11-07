import {authenticate, refreshToken, generatePasswordHashFromRequest, testUniqueUsername} from './user.middleware';
import {checkLogged} from '../../tools/access';
import restify from '../../restify';

module.exports = (router, models) => {
  restify(router, models, 'User', '/api/users', {
    preCreate: [
      generatePasswordHashFromRequest,
      (req, res) => testUniqueUsername(req, res, models)
    ],
    preUpdate: [
      generatePasswordHashFromRequest,
      (req, res) => testUniqueUsername(req, res, models)
    ],
    preMiddleware: [checkLogged]
  });

  router.post(
    '/api/authenticate',
    (req, res) => authenticate(req, res, models)
  );

  router.post(
    '/api/refreshToken',
    (req, res) => refreshToken(req, res, models)
  );
};
