export default (sequelize, DataTypes) => {
  const Right = sequelize.define("Right", {
    read: DataTypes.BOOLEAN,
    create: DataTypes.BOOLEAN,
    update: DataTypes.BOOLEAN,
    remove: DataTypes.BOOLEAN,
    menu: DataTypes.BOOLEAN,
    adminMenu: DataTypes.BOOLEAN,
    objectName: DataTypes.STRING
  });

  Right.associate = (models) => {
    Right.belongsTo(models.Profil, {as: 'profil'});
  };

  return Right;
};