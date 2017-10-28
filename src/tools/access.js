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