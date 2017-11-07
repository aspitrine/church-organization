import fs from 'fs';
import path from 'path';

export default (router, models) => {
  const folders = fs.readdirSync(path.join(__dirname, '../components/')).filter(folder => folder.indexOf('.') === -1);

  folders.forEach((folder) => {
    const files = fs.readdirSync(path.join(__dirname, '../components/', folder)).filter(file => file.indexOf('.routes.js') !== -1);

    files.forEach(file => {
      require(path.join(__dirname, '../components/', folder, file))(router, models);
    });
  });
};
