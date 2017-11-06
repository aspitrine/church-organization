export default (sequelize, DataTypes) => {
  const Room = sequelize.define("Room", {
    name: DataTypes.STRING
  });

  Room.associate = (models) => {
    Room.Church = Room.belongsTo(models.Church, {as: 'church'});
  };

  return Room;
};