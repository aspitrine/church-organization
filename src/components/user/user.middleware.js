import _ from 'lodash';
import bcrypt from 'bcrypt';
import config from '../../config/config.json';
import jwt from 'jsonwebtoken';
import getModels from '../../tools/database.js';

const models = getModels();

export const generatePasswordHashFromRequest = (req, res, next) => {
  if(req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, config.saltRounds);
  }
  next();
};

export const testUniqueUsername = async (req, res, next) => {
  const Op = models.Sequelize.Op;
  const request = {
    where: {
      username: req.body.username
    }
  };
  if(req.params.id) {
    request.where.id = {[Op.ne]: req.params.id};
  }
  const user = await models.User.findOne(request);
  if(user) {
    res.status(403).send({status: 'error', result: 'Ce nom d\'utilisateur existe déjà'});
  } else {
    next();
  }
};

export const authenticate = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      res.status(403).send({status: 'error', message: 'Authentification échoué'});
    }

    const token = jwt.sign({
      id: user.dataValues.id,
      profilId: _.get(user, 'dataValues.profilId'),
      churchId: _.get(user, 'dataValues.churchId')
    }, config.secret, {
      expiresIn: '7d'
    });

    res.send({result: token, status: 'success'});
  } catch (e) {
    res.status(500).send(e);
  }
};

export const refreshToken = async (req, res) => {
  if (req.decoded) {
    const payload = req.decoded;
    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;

    const user = await models.User.find({
      where: payload
    });
    if(user) {
      const token = jwt.sign({
        payload
      }, config.secret, {
        expiresIn: '7d'
      });
      res.send({result: token, status: 'success'});
    } else {
      res.status(403).send({status: 'error', result: 'user not found for this token'});
    }
  } else {
    res.status(401).send({status: 'error', result: 'Token not found or expired'});
  }
};