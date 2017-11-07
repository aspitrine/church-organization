import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/config.json';

export default (sequelize) => {
  if(!sequelize) {
    sequelize = new Sequelize(`${config.dialect}://${config.username}:${config.password}@${config.host}:${config.port}/${config.dbname}`);
  }

  const db = {};


  const componentPath = path.join(__dirname, '../components/');
  const folders = fs.readdirSync(componentPath).filter(folder => folder.indexOf('.') === -1);

  const files = _.chain(folders).map(folder => {
    return fs.readdirSync(path.join(componentPath, folder)).filter(file => file.indexOf('.model.js') !== -1).map(f => path.join(componentPath, folder, f));
  }).flatten().value();

  files.forEach(function(file) {
    const model = sequelize.import(file);
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