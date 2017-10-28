export default (sequelize, DataTypes) => {
  return sequelize.define("Profil", {
    name: DataTypes.STRING
  });
};