import {checkLogged, filterOnChurch, addChurchInBody} from '../../tools/access';
import {mangeUsers} from './team.middleware';
import restify from '../../restify';

module.exports = (router) => {
  restify(router, 'Team', '/api/teams', {
    preRead: [filterOnChurch],
    preCreate: [addChurchInBody],
    preUpdate: [filterOnChurch, addChurchInBody],
    preDelete: [filterOnChurch],
    preMiddleware: [checkLogged]
  });

  router.post('/api/teams/:teamId/mangeUsers', checkLogged, mangeUsers);
};
