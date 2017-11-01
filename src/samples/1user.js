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

  const church = await models.Church.findOne({where:{name: 'EPE Douai'}});

  const users = [{
    username: 'qle',
    password: bcrypt.hashSync('admin', config.saltRounds),
    email: 'admin@yopmail.com',
    phone: '0662132076',
    profilId: adminProfil.dataValues.id,
    churchId: church.dataValues.id
  }, {
    username: 'manager',
    password: bcrypt.hashSync('manager', config.saltRounds),
    email: 'manager@yopmail.com',
    phone: '0662132076',
    profilId: managerProfil.dataValues.id,
    churchId: church.dataValues.id
  }, {
    username: 'user1',
    password: bcrypt.hashSync('user1', config.saltRounds),
    email: 'user1@yopmail.com',
    phone: '0662132076',
    profilId: userProfil.dataValues.id,
    churchId: church.dataValues.id
  }, {
    username: 'user2',
    password: bcrypt.hashSync('user2', config.saltRounds),
    email: 'user2@yopmail.com',
    phone: '0662132076',
    profilId: userProfil.dataValues.id,
    churchId: church.dataValues.id
  }, {
    username: 'user3',
    password: bcrypt.hashSync('user3', config.saltRounds),
    email: 'user3@yopmail.com',
    phone: '0662132076',
    profilId: userProfil.dataValues.id,
    churchId: church.dataValues.id
  }, {
    username: 'user4',
    password: bcrypt.hashSync('user4', config.saltRounds),
    email: 'user4@yopmail.com',
    phone: '0662132076',
    profilId: userProfil.dataValues.id,
    churchId: church.dataValues.id
  }];

  await Promise.all(users.map((u) => models.User.create(u)));
};