const fs = require('node:fs');
const path = require('node:path');
const fsPromises = require('fs/promises');

const DEST_BUILD = path.join(__dirname, 'project-dist');

const SRC_ASSETS = path.join(__dirname, 'assets');
const BLD_ASSETS = path.join(DEST_BUILD, 'assets');

const SRC_HTML = path.join(__dirname, 'template.html');

const SRC_STYLES = path.join(__dirname, 'styles');
const BLD_STYLES = path.join(DEST_BUILD, 'style.css');

const SRC_COMPONENTS = path.join(__dirname, 'components');
const BLD_COMPONENTS = path.join(DEST_BUILD, 'index.html');


const createBuild = async () => {
  await fsPromises.rm(path.resolve(DEST_BUILD), { recursive: true, force: true });
};

const createAssets = async () => {
  try {
    await fsPromises.mkdir(BLD_ASSETS, { recursive: true, force: true });
  } catch (error) {
    console.error(error);
  }
};

const copyAssets = async () => {
  fsPromises.readdir(SRC_ASSETS, { withFileTypes: true }).then(files => {
    for (const file of files) {
      const srcFilePath = path.join(SRC_ASSETS, file.name);
      const destFilePath = path.join(BLD_ASSETS, file.name);

      if (file.isFile()) {
        fsPromises.copyFile(srcFilePath, destFilePath);
      }
      else {
        fsPromises.readdir(srcFilePath, { withFileTypes: true }).then(destination => {
          fsPromises.mkdir(path.join(BLD_ASSETS, file.name), { recursive: true });

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

const combineHtml = async () => {
  let srcHtmlContent = await fsPromises.readFile(SRC_HTML, 'utf-8');
  const components = await fsPromises.readdir(SRC_COMPONENTS);

  for (const file of components) {
    const fileExt = path.parse(path.join(SRC_COMPONENTS, file)).ext;

    if (fileExt == '.html') {
      const fileName = path.parse(path.join(SRC_COMPONENTS, file)).name;
      const rf = await fsPromises.readFile(path.join(SRC_COMPONENTS, file));
      srcHtmlContent = srcHtmlContent.replace(`{{${fileName}}}`, rf);
    };
  }
  fs.writeFile(BLD_COMPONENTS, srcHtmlContent, (err) => {
    if (err) { throw err; }
  });
}

const combineStyles = async () => {
  fsPromises.readdir(SRC_STYLES, { withFileTypes: true }).then(styleFiles => {
    const ws = fs.createWriteStream(BLD_STYLES);

    for (const file of styleFiles) {
      const srcFilePath = path.join(SRC_STYLES, file.name);
      const fileName = path.basename(srcFilePath);
      const fileExt = path.extname(srcFilePath);

      if (fileExt == '.css') {
        const rs = new fs.createReadStream(path.join(SRC_STYLES, fileName), 'utf-8');
        rs.on('data', data => {
          ws.write(`${data}\n`);
        });
      }
    }
  });
};

const appBuild = async () => {
  createBuild();
  createAssets();
  copyAssets();
  combineHtml();
  combineStyles();
};
appBuild();