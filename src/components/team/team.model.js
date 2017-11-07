export default (sequelize, DataTypes) => {
  const Team = sequelize.define("Team", {
    name: DataTypes.STRING,
    color: DataTypes.STRING
  });

  Team.associate = (models) => {
    Team.Church = Team.belongsTo(models.Church, {as: 'church'});
    Team.User = Team.belongsToMany(models.User, {through: 'UserTeam'});
    Team.Event = Team.belongsToMany(models.Event, {through: 'EventTeam'});
  };

  return Team;
};