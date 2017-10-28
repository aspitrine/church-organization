import bcrypt from 'bcrypt';
import config from '../config/config.json';

module.exports = async (models) => {
  const adminProfil = await models.Profil.create({
    name: 'Admin'
  });

  const userProfil = await models.Profil.create({
    name: 'User'
  });

  await models.User.create({
    username: 'qle',
    password: bcrypt.hashSync('admin', config.saltRounds),
    email: 'loquente62@gmail.com',
    phone: '0662132076',
    profilId: adminProfil.dataValues.id
  });
};