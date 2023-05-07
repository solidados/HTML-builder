const fs = require('fs');
const path = require('path');

const { readdir, stat } = fs;
const { join, resolve, parse } = path;
const { stdout } = process;

const folderContent = () => {
  const folderPath = join(__dirname, 'secret-folder');

  readdir(folderPath, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      stat(resolve(folderPath, file), (err, Stats) => {
        if (err) throw err;

        if (Stats.isFile()) {
          const fileName = parse(file).name;
          const fileExtension = parse(file).ext.slice(1);
          const fileSize = (Stats.size / 1024).toFixed(2);
          stdout.write(`${fileName} - ${fileExtension} - ${fileSize}kb\n`)
        }
      })
    })
  });
};
folderContent();