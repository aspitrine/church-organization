import ensureArray from 'ensure-array';
import operator from './operator';

export default (router, models, modelName, route, options) => {
  options.preRead = ensureArray(options.preRead);
  options.preCreate = ensureArray(options.preCreate);
  options.preUpdate = ensureArray(options.preUpdate);
  options.preDelete = ensureArray(options.preDelete);
  options.preMiddleware = ensureArray(options.preMiddleware);
  options.postRead = ensureArray(options.postRead);
  options.postCreate = ensureArray(options.postCreate);
  options.postUpdate = ensureArray(options.postUpdate);
  options.postDelete = ensureArray(options.postDelete);
  options.postMiddleware = ensureArray(options.postMiddleware);

  const ops = operator(models, modelName);

  const output = (req, res) => {
    res.status(req.erm.statusCode).send(req.erm.result);
  };

  // Get all
  router.get(route, options.preRead, options.preMiddleware, ops.findAll, options.postMiddleware, options.postRead, output);

  // Get one
  router.get(`${route}/:id`, options.preRead, options.preMiddleware, ops.findOne, options.postMiddleware, options.postRead, output);

  // Create
  router.put(route, options.preCreate, options.preMiddleware, ops.create, options.postMiddleware, options.postCreate, output);

  // Update
  router.post(`${route}/:id`, options.preUpdate, options.preMiddleware, ops.update, options.postMiddleware, options.postCreate, output);

  // Remove
  router.delete(`${route}/:id`, options.preDelete, options.preMiddleware, ops.remove, options.postMiddleware, options.postDelete, output);
};