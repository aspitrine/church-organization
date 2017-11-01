module.exports = async (models) => {
  const church = await models.Church.findOne({where:{
    name: 'EPE Douai'
  }});

  const user1 = await models.User.findOne({where:{
    username: 'user1'
  }});

  const user2 = await models.User.findOne({where:{
    username: 'user2'
  }});

  const user3 = await models.User.findOne({where:{
    username: 'user3'
  }});

  const user4 = await models.User.findOne({where:{
    username: 'user4'
  }});

  const team1 = await models.Team.create({
    name: 'team1',
    churchId: church.dataValues.id
  });

  const team2 = await models.Team.create({
    name: 'team2',
    churchId: church.dataValues.id
  });

  await team1.setUsers([user1.dataValues.id, user2.dataValues.id]);
  await team2.setUsers([user3.dataValues.id, user4.dataValues.id]);

};