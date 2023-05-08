const fs = require('node:fs');
const path = require('node:path');
const fsPromises = require('fs/promises');

const destBuild = path.join(__dirname, 'project-dist');
// const buildLayout = path.join(buildFolder, 'index.html');
// const buildStyles = path.join(buildFolder, 'style.css');

const srcComponents = path.join(__dirname, 'components');
const srcStyles = path.join(__dirname, 'styles');
const srcAssets = path.join(__dirname, 'assets');

const createDist = async () => {
  await fsPromises.rm(path.resolve(destBuild), { recursive: true, force: true });
  await fsPromises.mkdir(destBuild, console.log('Project folder was created'));
};
createDist();

const createAssets = async () => {
  try {
    await fsPromises.access(destBuild);
    await fsPromises.mkdir(destBuild, 'assets');
  } catch (error) {
    console.error(Error);
  }
};
createAssets();
