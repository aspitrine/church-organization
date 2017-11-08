import getModels from '../tools/database.js';

const models = getModels();

export default (modelName) => {
  const findAll = async (req, res, next) => {
    try {
      const query = req.query ? req.query : {};
      const queryFilter = req.queryFilter ? req.queryFilter : {};

      query.where = query.where ?
        Object.assign({}, query.where, queryFilter) :
        queryFilter;

      if(query.include) {
        query.include = query.include.map(m => ({
          model: models[m],
          as: m.toLowerCase()
        }));
      }

      const result = await models[modelName].findAll(query);

      req.erm = {
        result: {result: result, status: 'success'},
        statusCode: 200
      };
      next();
    } catch (e) {
      console.log(e);
      req.erm = {
        result: {result: e, status: 'error'},
        statusCode: 500
      };
      next();
    }

  };

  const findOne = async (req, res, next) => {
    try {
      const query = req.query ? req.query : {};
      const queryFilter = req.queryFilter ? req.queryFilter : {};

      if(query.include) {
        query.include = query.include.map(m => ({
          model: models[m],
          as: m.toLowerCase()
        }));
      }

      query.where = query.where ?
        Object.assign({}, query.where, queryFilter, {id: req.params.id}) :
        Object.assign({}, queryFilter, {id: req.params.id});

      const result = await models[modelName].findOne(query);
      req.erm = {
        result: {result: result, status: 'success'},
        statusCode: 200
      };
      next();
    } catch (e) {
      console.log(e);
      req.erm = {
        result: {result: e, status: 'error'},
        statusCode: 500
      };
      next();
    }
  };

  const create = async (req, res, next) => {
    try {
      const result = await models[modelName].create(req.body);
      req.erm = {
        result: {result: result, status: 'success'},
        statusCode: 200
      };
      next();
    } catch (e) {
      console.log(e);
      req.erm = {
        result: {result: e, status: 'error'},
        statusCode: 500
      };
      next();
    }
  };

  const update = async (req, res, next) => {
    try {
      const queryFilter = req.queryFilter ? req.queryFilter : {};
      const request = Object.assign({}, queryFilter, {id: req.params.id});
      const result = await models[modelName].update(req.body, {where: request});
      req.erm = {
        result: {result: result, status: 'success'},
        statusCode: 200
      };
      next();
    } catch (e) {
      console.log(e);
      req.erm = {
        result: {result: e, status: 'error'},
        statusCode: 500
      };
      next();
    }
  };

  const remove = async (req, res, next) => {
    try {
      const queryFilter = req.queryFilter ? req.queryFilter : {};
      const request = Object.assign({}, queryFilter, {id: req.params.id});
      const result = await models[modelName].destroy({where: request});
      req.erm = {
        result: {result: result, status: 'success'},
        statusCode: 200
      };
      next();
    } catch (e) {
      console.log(e);
      req.erm = {
        result: {result: e, status: 'error'},
        statusCode: 500
      };
      next();
    }
  };

  return {
    findAll: findAll,
    findOne: findOne,
    create: create,
    update: update,
    remove: remove
  };
};
