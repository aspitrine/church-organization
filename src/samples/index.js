import fs from 'fs';
import path from 'path';

export default async (models) => {
  return await Promise.all(fs.readdirSync(__dirname).filter((f) => {
    return (f.indexOf('.') !== 0) && (f !== 'index.js');
  }).map(async (f) => {
    console.log(`start sample ${f}`);
    await require(path.join(__dirname, f))(models);
    console.log(`sample done for ${f}`);
    return Promise.resolve();
  }));
}