export default (router, model, route, options) => {
  const defaultOptions = {
    preRead: [],
    preCreate: [],
    preUpdate: [],
    preDelete: [],
    postRead: [],
    postCreate: [],
    postUpdate: [],
    postDelete: [],
  };

  if(!options) {
    options = defaultOptions;
  } else {
    Object.assign({}, defaultOptions, options);
  }
  if(!Array.isArray(options.preRead)) {
    options.preRead = [options.preRead];
  }
  if(!Array.isArray(options.preCreate)) {
    options.preCreate = [options.preCreate];
  }
  if(!Array.isArray(options.preUpdate)) {
    options.preUpdate = [options.preUpdate];
  }
  if(!Array.isArray(options.preDelete)) {
    options.preDelete = [options.preDelete];
  }
  if(!Array.isArray(options.postRead)) {
    options.postRead = [options.postRead];
  }
  if(!Array.isArray(options.postCreate)) {
    options.postCreate = [options.postCreate];
  }
  if(!Array.isArray(options.postUpdate)) {
    options.postUpdate = [options.postUpdate];
  }
  if(!Array.isArray(options.postDelete)) {
    options.postDelete = [options.postDelete];
  }


  // Get all
  router.get(route, async (req, res) => {
    try {
      options.preRead.forEach(f => f(req, res));

      const query = req.query ? req.query : {};
      const result = await model.findAll(query);

      options.postRead.forEach(f => f(req, res, result));

      res.send({ result: result, status: 'success' });
    } catch (e) {
      res.status(500).send(e);
    }
  });

  // Get one
  router.get(`${route}/:id`, async (req, res) => {
    try {
      options.preRead.forEach(f => f(req, res));

      const result = await model.findOne({id: req.params.id});

      options.postRead.forEach(f => f(req, res, result));

      res.send({ result: result, status: 'success' });
    } catch (e) {
      res.status(500).send(e);
    }
  });

  // Create
  router.put(route, async (req, res) => {
    try {
      options.preCreate.forEach(f => f(req, res));

      const result = await model.create(req.body);

      options.preCreate.forEach(f => f(req, res, result));

      res.send({ result: result, status: 'success' });
    } catch (e) {
      res.status(500).send(e);
    }
  });

  // Update
  router.post(`${route}/:id`, async (req, res) => {
    try {
      options.preUpdate.forEach(f => f(req, res));

      const result = await model.update(req.body, { where: { id: req.params.id }});

      options.preUpdate.forEach(f => f(req, res, result));

      res.send({ result: result, status: 'success' });
    } catch (e) {
      res.status(500).send(e);
    }
  });

  // Remove
  router.delete(`${route}/:id`, async (req, res) => {
    try {
      options.preDelete.forEach(f => f(req, res));

      const result = await model.destroy({ where: { id: req.params.id }});

      options.postDelete.forEach(f => f(req, res, result));

      res.send({ result: result, status: 'success' });
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });
};