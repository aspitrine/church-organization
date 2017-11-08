import {checkLogged, filterOnChurch, addChurchInBody} from '../../tools/access';
import restify from '../../restify';

module.exports = (router) => {
  restify(router, 'Room', '/api/rooms', {
    preRead: [filterOnChurch],
    preCreate: [addChurchInBody],
    preUpdate: [filterOnChurch, addChurchInBody],
    preDelete: [filterOnChurch],
    preMiddleware: [checkLogged]
  });
};
