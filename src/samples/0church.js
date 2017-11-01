module.exports = async (models) => {
  const church = await models.Church.create({
    name: 'EPE Douai',
    state: 'FRANCE',
    city: 'Douai',
    street: 'Rue Léo Lagrange',
    streetNumber: '420'
  });

  await models.Room.create({
    name: 'Principale',
    churchId: church.dataValues.id
  });

  await models.Room.create({
    name: 'Bureau',
    churchId: church.dataValues.id
  });

  await models.Room.create({
    name: 'Salle des aventuriers',
    churchId: church.dataValues.id
  });
};