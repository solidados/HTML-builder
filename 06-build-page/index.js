// ! --- 01:57am Please give me some more time. and check again before deadline. Thank you!

const fs = require('node:fs');
const path = require('node:path');
const fsPromises = require('fs/promises');

const destBuild = path.join(__dirname, 'project-dist');
const destAssets = path.join(destBuild, 'assets');
const srcAssets = path.join(__dirname, 'assets');

const buildLayout = path.join(buildFolder, 'index.html');
const buildStyles = path.join(buildFolder, 'style.css');

const srcComponents = path.join(__dirname, 'components');
const srcStyles = path.join(__dirname, 'styles');

const createDist = async () => {
  await fsPromises.rm(path.resolve(destBuild), { recursive: true, force: true });
};

const createAssets = async () => {
  try {
    await fsPromises.mkdir(destAssets, { recursive: true });
  } catch (error) {
    console.error(error);
  }
};

const copyAssets = async (srcAssets, srcAssets) => {
  const folderContent = await fsPromises.readdir(srcAssets);
  for (const item of folderContent) {
    
    if (item.isDirectory()) {
      copyAssets();
    }
  }
  /* fsPromises.readdir((srcAssets, { withFileTypes: true }), (_, files) => {
    for (const file of files) {
      const srcFile = path.join(srcAssets, file);
      const destFile = path.join(destAssets, file);

      if (file.isFile()) {
        fsPromises.copyFile(srcFile, destFile)
      } else {
        console.log('Something went wrong');
        // fsPromises.readdir((srcFile, { withFileTypes: true }), () => {})
      }
    }
  }) */
}

createDist();
createAssets();
copyAssets();

/* fs.readdir(srcAssets, (_, files) => {
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
    const srcPath = join(src, file);
    const destPath = join(dest, file);
    const itemStat = await stat(srcPath);

    if (itemStat.isDirectory()) {
      await copyFolder(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
} */
