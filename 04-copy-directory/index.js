const path = require('path');
const { access, rm } = require('node:fs');
const { readdir, mkdir, copyFile } = require('node:fs/promises');

const src = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'files-copy');

const makeDir = async () => {
  const dirCreation = await mkdir(dest, {
    recursive: true,
  });
  return dirCreation;
}

const copyContent = async () => {
  const files = await readdir(src);
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    await copyFile(srcPath, destPath);
  }
}

const copyDir = () => {
  makeDir();
  copyContent();
};

const rewriteDir = () => {
  access(dest, (err) => {
    if (err) {
      copyDir();
    } else {
      rm(dest, { recursive: true }, (err) => {
        if (err) {
          console.error('Folder is not found');
        }
        copyDir();
      });
    }
  });
}
rewriteDir();
