export default (sequelize, DataTypes) => {
  const Team = sequelize.define("Team", {
    name: DataTypes.STRING
  });

  Team.associate = (models) => {
    Team.belongsTo(models.Church, {as: 'church'});
    Team.belongsToMany(models.User, {through: 'UserTeam'});
    Team.belongsToMany(models.Event, {through: 'EventTeam'});
  };

  return Team;
};