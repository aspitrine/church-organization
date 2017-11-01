import fs from 'fs';
import path from 'path';

export default async (models) => {
  const file = fs.readdirSync(__dirname).filter((f) => {
    return (f.indexOf('.') !== 0) && (f !== 'index.js');
  });

  for(const f of file) {
    console.log(`start sample ${f}`);
    await require(path.join(__dirname, f))(models);
    console.log(`sample done for ${f}`);
  }
}