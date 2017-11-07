import {checkLogged, filterOnChurch, addChurchInBody} from '../../tools/access';
import {mangeUsers} from './team.middleware';
import restify from '../../restify';

module.exports = (router, models) => {
  restify(router, models, 'Team', '/api/teams', {
    preRead: [filterOnChurch],
    preCreate: [addChurchInBody],
    preUpdate: [filterOnChurch, addChurchInBody],
    preDelete: [filterOnChurch],
    preMiddleware: [checkLogged]
  });

  router.post(
    '/api/teams/:teamId/mangeUsers',
    checkLogged,
    (req, res) => mangeUsers(req, res, models));
};
