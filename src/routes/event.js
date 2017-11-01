import {checkLogged, filterOnChurch, addChurchInBody} from '../tools/access';
import restify from '../restify';

module.exports = (router, models) => {

  restify(router, models.Event, '/api/events', {
    preRead: [filterOnChurch],
    preCreate: [addChurchInBody],
    preUpdate: [filterOnChurch, addChurchInBody],
    preDelete: [filterOnChurch],
    preMiddleware: [checkLogged]
  });
};
