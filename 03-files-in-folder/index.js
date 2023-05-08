const fs = require('fs');
const path = require('path');
const { stdout } = process;

const getFolderContent = () => {
  const folderPath = path.join(__dirname, 'secret-folder');

  fs.readdir(folderPath, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      fs.stat(path.resolve(folderPath, file), (err, Stats) => {
        if (err) throw err;

        if (Stats.isFile()) {
          const fileName = path.parse(file).name;
          const fileExtension = path.parse(file).ext.slice(1);
          const fileSize = (Stats.size / 1024).toFixed(2);
          stdout.write(`${fileName} - ${fileExtension} - ${fileSize}kb\n`);
        }
      })
    })
  });
};
getFolderContent();