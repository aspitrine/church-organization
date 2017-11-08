import {authenticate, refreshToken, generatePasswordHashFromRequest, testUniqueUsername} from './user.middleware';
import {checkLogged} from '../../tools/access';
import restify from '../../restify';

module.exports = (router) => {
  restify(router, 'User', '/api/users', {
    preCreate: [generatePasswordHashFromRequest, testUniqueUsername],
    preUpdate: [generatePasswordHashFromRequest, testUniqueUsername],
    preMiddleware: [checkLogged]
  });

  router.post('/api/authenticate', authenticate);

  router.post('/api/refreshToken', refreshToken);
};
