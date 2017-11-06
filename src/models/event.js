export default (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    isPublic: DataTypes.BOOLEAN
  });

  Event.associate = (models) => {
    Event.Room = Event.belongsTo(models.Room, {as: 'room'});
    Event.Church = Event.belongsTo(models.Church, {as: 'church'});
    Event.Team = Event.belongsToMany(models.Team, {as: 'team', through: 'EventTeam'});
  };

  return Event;
};