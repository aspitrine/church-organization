import bcrypt from 'bcrypt';
import config from '../config/config.json';

module.exports = async (models) => {
  const adminProfil = await models.Profil.create({
    name: 'Admin'
  });

  const managerProfil = await models.Profil.create({
    name: 'Manager'
  });

  const userProfil = await models.Profil.create({
    name: 'User'
  });

  const users = [{
    username: 'qle',
    password: bcrypt.hashSync('admin', config.saltRounds),
    email: 'admin@yopmail.com',
    phone: '0662132076',
    profilId: adminProfil.dataValues.id
  }, {
    username: 'manager',
    password: bcrypt.hashSync('manager', config.saltRounds),
    email: 'manager@yopmail.com',
    phone: '0662132076',
    profilId: managerProfil.dataValues.id
  }, {
    username: 'user',
    password: bcrypt.hashSync('user', config.saltRounds),
    email: 'user@yopmail.com',
    phone: '0662132076',
    profilId: userProfil.dataValues.id
  }];

  await Promise.all(users.map((u) => models.User.create(u)));
};