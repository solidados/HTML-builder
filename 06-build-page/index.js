const fs = require('node:fs');
const path = require('node:path');
const fsPromises = require('fs/promises');

const buildFolder = path.join(__dirname, 'project-dist');
const buildLayout = path.join(buildFolder, 'index.html');
const buildStyles = path.join(buildFolder, 'style.css');

fsPromises.mkdir(buildFolder, () => {
  console.log('Build folder created');
});


