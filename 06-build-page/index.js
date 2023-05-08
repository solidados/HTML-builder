const fs = require('node:fs');
const path = require('node:path');
const fsPromises = require('fs/promises');

const destBuild = path.join(__dirname, 'project-dist');
const destAssets = path.join(destBuild, 'assets');

// const buildLayout = path.join(buildFolder, 'index.html');
// const buildStyles = path.join(buildFolder, 'style.css');

// const srcComponents = path.join(__dirname, 'components');
// const srcStyles = path.join(__dirname, 'styles');
// const srcAssets = path.join(__dirname, 'assets');

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


createDist();
createAssets();

