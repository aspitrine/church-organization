export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {type: DataTypes.STRING, unique: true},
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  });

  User.associate = (models) => {
    User.belongsTo(models.Profil, {as: 'profil'});
    User.belongsTo(models.Church, {as: 'church'});
    User.belongsToMany(models.Team, {through: 'UserTeam'});
  };

  return User;
};