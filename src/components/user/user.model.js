export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {type: DataTypes.STRING, unique: true},
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  });

  User.associate = (models) => {
    User.Profil = User.belongsTo(models.Profil, {as: 'profil'});
    User.Church = User.belongsTo(models.Church, {as: 'church'});
    User.Team = User.belongsToMany(models.Team, {through: 'UserTeam'});
  };

  return User;
};