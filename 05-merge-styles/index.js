const {
  createReadStream,
  createWriteStream,
  stat,
  readFile,
  appendFile
} = require('node:fs');
const { readdir } = require('node:fs/promises');
const { join, resolve, extname } = require('node:path');

const src = join(__dirname, 'styles');
const dest = join(__dirname, 'project-dist', 'bundle.css');

const rs = createWriteStream(dest);

const readFolderContent = async () => {
  const files = await readdir(src);
  for (const file of files) {
    const srcFilePath = join(src, file);

    try {
      stat(resolve(srcFilePath), (_, stats) => {
        if (stats.isFile() && extname(file) == '.css') {
          createReadStream(srcFilePath, 'utf-8');
  
          readFile(srcFilePath, 'utf-8', (err, data) => {
            if (err) throw err;
            appendFile(dest, data, err => {
              if (err) throw err;
              console.log(`${file} - data was transfered`);
            });
          });
        };
      });
    } catch (error) {
      console.error(error);
    }
  }
};
readFolderContent();
