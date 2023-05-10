const fs = require('node:fs');
const path = require('node:path');
const fsPromises = require('fs/promises');
const { log } = require('node:console');

const DEST_BUILD = path.join(__dirname, 'project-dist');
const DEST_ASSETS = path.join(DEST_BUILD, 'assets');
const SRC_ASSETS = path.join(__dirname, 'assets');


// const BLD_LAYOUT = path.join(buildFolder, 'index.html');
// const BLD_STYLES = path.join(buildFolder, 'style.css');

// const SRC_COMPONENTS = path.join(__dirname, 'components');
// const SRC_STYLES = path.join(__dirname, 'styles');

const createDist = async () => {
  await fsPromises.rm(path.resolve(DEST_BUILD), { recursive: true, force: true });
};

const createAssets = async () => {
  try {
    await fsPromises.mkdir(DEST_ASSETS, { recursive: true, force: true });
  } catch (error) {
    console.error(error);
  }
};

const copyAssets = async () => {
  fsPromises.readdir(SRC_ASSETS, { withFileTypes: true }).then(files => {
    for (const file of files) {
      const srcFilePath = path.join(SRC_ASSETS, file.name);
      const destFilePath = path.join(DEST_ASSETS, file.name);
      
      if (file.isFile()) {
        fsPromises.copyFile(srcFilePath, destFilePath);
      }
      else {
        fsPromises.readdir(srcFilePath, { withFileTypes: true }).then(destination => {
          fsPromises.mkdir(path.join(DEST_ASSETS, file.name), { recursive: true });

          for (const item of destination) {
            const cpFrom = path.join(srcFilePath, item.name);
            const cpTo = path.join(destFilePath, item.name);
            fsPromises.copyFile(cpFrom, cpTo);
          }
        });
      }
    }
  });
};

createDist();
createAssets();
copyAssets();

/* fs.readdir(SRC_ASSETS, (_, files) => {
  for (const file of files) {
    console.log(file);
    fs.readFile(file, () => {
      console.log(content);

    });
  }
}) */

/* async function copyFolder(src, dest) {
  await mkdir(dest, { recursive: true });
  const files = await readdir(src);

  for (const file of files) {
    const destination = join(src, file);
    const destPath = join(dest, file);
    const itemStat = await stat(destination);

    if (itemStat.isDirectory()) {
      await copyFolder(destination, destPath);
    } else {
      await copyFile(destination, destPath);
    }
  }
} */
