export default (model) => {
  const findAll = async (req, res, next) => {
    try {
      const query = req.query ? req.query : {};
      const queryFilter = req.queryFilter ? req.queryFilter : {};

      query.where = query.where ?
        Object.assign({}, query.where, queryFilter) :
        queryFilter;

      const result = await model.findAll(query);

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

      query.where = query.where ?
        Object.assign({}, query.where, queryFilter, {id: req.params.id}) :
        Object.assign({}, queryFilter, {id: req.params.id});

      const result = await model.findOne(query);
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
      const result = await model.create(req.body);
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
      const result = await model.update(req.body, {where: request});
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
      const result = await model.destroy({where: request});
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
