import _ from 'lodash';
import config from '../config/config.json';
import jwt from 'jsonwebtoken';

export const setDecodedToken = (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      req.decoded = jwt.verify(token, config.secret);
      next();
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    next();
  }
};

export const checkLogged = (req, res, next) => {
  if(!req.decoded) {
    res.status(401).send({ result: 'Unauthorized', status: 'error' });
  } else {
    next();
  }
};

export const filterOnChurch = (req, res, next) => {
  const churchId = _.get(req, 'decoded.payload.churchId');
  if (churchId) {
    req.queryFilter = Object.assign({}, {churchId: churchId});
    next();
  } else {
    res.status(401).send({ result: 'Unauthorized', status: 'error'});
  }
};

export const addChurchInBody = (req, res, next) => {
  const churchId = _.get(req, 'decoded.payload.churchId');
  if (churchId) {
    req.body = Object.assign({}, req.body, {churchId: churchId});
    next();
  } else {
    res.status(401).send({ result: 'Unauthorized', status: 'error'});
  }
};