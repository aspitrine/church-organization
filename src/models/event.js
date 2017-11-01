export default (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  });

  Event.associate = (models) => {
    Event.belongsTo(models.Room, {as: 'room'});
  };

  return Event;
};