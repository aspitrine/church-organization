import _ from 'lodash';
import {checkLogged, filterOnChurch, addChurchInBody} from '../../tools/access';
import ensureArray from 'ensure-array';
import restify from '../../restify';

module.exports = (router, models) => {
  restify(router, models, 'Church', '/api/churches', {
    preRead: [filterOnChurch],
    preCreate: [addChurchInBody],
    preUpdate: [filterOnChurch, addChurchInBody],
    preDelete: [filterOnChurch],
    preMiddleware: [checkLogged]
  });
};
