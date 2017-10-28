import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/config.json';

export default (sequelize) => {
  if(!sequelize) {
    sequelize = new Sequelize(`${config.dialect}://${config.username}:${config.password}@${config.host}:${config.port}/${config.dbname}`);
  }

  const db = {};

  fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  }).forEach(function(file) {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

  for(const modelName of Object.keys(db)) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  }

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
}