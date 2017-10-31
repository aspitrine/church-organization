export default (sequelize, DataTypes) => {
  const Right = sequelize.define("Right", {
    read: DataTypes.BOOLEAN,
    create: DataTypes.BOOLEAN,
    update: DataTypes.BOOLEAN,
    remove: DataTypes.BOOLEAN,
    menu: DataTypes.BOOLEAN,
    adminMenu: DataTypes.BOOLEAN
  });

  Right.associate = (models) => {
    Right.belongsTo(models.Profil, {as: 'profil'});
  };

  return Right;
};