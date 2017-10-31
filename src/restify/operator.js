export default (model) => {
  const findAll = async (req, res, next) => {
    try {
      const query = req.query ? req.query : {};
      const result = await model.findAll(query);
      req.erm = {
        result: { result: result, status: 'success' },
        statusCode: 200
      };
      next();
    } catch (e) {
      console.log(e);
    }

  };

  const findOne = async (req, res, next) => {
    try {
      const result = await model.findOne({id: req.params.id});
      req.erm = {
        result: { result: result, status: 'success' },
        statusCode: 200
      };
      next();
    } catch (e) {
      console.log(e);
    }
  };

  const create = async (req, res, next) => {
    try {
      const result = await model.create(req.body);
      req.erm = {
        result: { result: result, status: 'success' },
        statusCode: 200
      };
      next();
    } catch (e) {
      console.log(e);
    }
  };

  const update = async (req, res, next) => {
    try {
      const result = await model.update(req.body, { where: { id: req.params.id }});
      req.erm = {
        result: { result: result, status: 'success' },
        statusCode: 200
      };
      next();
    } catch (e) {
      console.log(e);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const result = await model.destroy({ where: { id: req.params.id }});
      req.erm = {
        result: { result: result, status: 'success' },
        statusCode: 200
      };
      next();
    } catch (e) {
      console.log(e);
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
