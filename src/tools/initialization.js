import Sequelize from 'sequelize';
import initDb from '../tools/database';
import config from '../config/config.json';
import runSample from '../samples';

const initialization = async () => {
  try {
    const sequelize = new Sequelize(`${config.dialect}://${config.username}:${config.password}@${config.host}:${config.port}/postgres`);
    await sequelize.query(`DROP DATABASE IF EXISTS "${config.dbname}"`);
    console.log('database droped');

    await sequelize.query(`CREATE DATABASE "${config.dbname}" WITH OWNER ${config.username}`);
    console.log('database created');

    const models = initDb();
    await models.sequelize.sync();
    await runSample(models);
    console.log('sample done');
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

initialization().then(() => {
  console.log('initialization database ended');
});

