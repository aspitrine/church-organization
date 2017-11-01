import {checkLogged, filterOnChurch, addChurchInBody} from '../tools/access';
import restify from '../restify';

module.exports = (router, models) => {

  restify(router, models.Team, '/api/teams', {
    preRead: [filterOnChurch],
    preCreate: [addChurchInBody],
    preUpdate: [filterOnChurch, addChurchInBody],
    preDelete: [filterOnChurch],
    preMiddleware: [checkLogged]
  });
};
