export default (sequelize, DataTypes) => {
  return sequelize.define("Church", {
    name: {type: DataTypes.STRING, unique: true},
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    streetNumber: DataTypes.STRING
  });
};