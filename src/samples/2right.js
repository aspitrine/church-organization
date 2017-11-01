module.exports = async (models) => {
  const adminProfil = await models.Profil.findOne({
    name: 'Admin'
  });
  const managerProfil = await models.Profil.findOne({
    name: 'Manager'
  });
  const userProfil = await models.Profil.findOne({
    name: 'User'
  });

  // User
  await models.Right.create({
    read: true,
    create: true,
    update: true,
    remove: true,
    menu: true,
    adminMenu: true,
    profilId: adminProfil.dataValues.id,
    objectName: 'User'
  });

  await models.Right.create({
    read: true,
    create: true,
    update: true,
    remove: true,
    menu: true,
    adminMenu: true,
    profilId: managerProfil.dataValues.id,
    objectName: 'User'
  });

  await models.Right.create({
    read: true,
    create: false,
    update: false,
    remove: false,
    menu: true,
    adminMenu: false,
    profilId: userProfil.dataValues.id,
    objectName: 'User'
  });

  // Profil
  await models.Right.create({
    read: true,
    create: true,
    update: true,
    remove: true,
    menu: true,
    adminMenu: true,
    profilId: adminProfil.dataValues.id,
    objectName: 'Profil'
  });

  await models.Right.create({
    read: true,
    create: true,
    update: true,
    remove: true,
    menu: true,
    adminMenu: true,
    profilId: managerProfil.dataValues.id,
    objectName: 'Profil'
  });

  await models.Right.create({
    read: true,
    create: false,
    update: false,
    remove: false,
    menu: true,
    adminMenu: false,
    profilId: userProfil.dataValues.id,
    objectName: 'Profil'
  });

  // Right
  await models.Right.create({
    read: true,
    create: true,
    update: true,
    remove: true,
    menu: true,
    adminMenu: true,
    profilId: adminProfil.dataValues.id,
    objectName: 'Right'
  });

  await models.Right.create({
    read: true,
    create: true,
    update: true,
    remove: true,
    menu: true,
    adminMenu: true,
    profilId: managerProfil.dataValues.id,
    objectName: 'Right'
  });

  await models.Right.create({
    read: true,
    create: false,
    update: false,
    remove: false,
    menu: true,
    adminMenu: false,
    profilId: userProfil.dataValues.id,
    objectName: 'Right'
  });

  // Church
  await models.Right.create({
    read: true,
    create: true,
    update: true,
    remove: true,
    menu: true,
    adminMenu: true,
    profilId: adminProfil.dataValues.id,
    objectName: 'Church'
  });

  await models.Right.create({
    read: true,
    create: true,
    update: true,
    remove: true,
    menu: true,
    adminMenu: true,
    profilId: managerProfil.dataValues.id,
    objectName: 'Church'
  });

  await models.Right.create({
    read: true,
    create: false,
    update: false,
    remove: false,
    menu: true,
    adminMenu: false,
    profilId: userProfil.dataValues.id,
    objectName: 'Church'
  });
};