const { readFile } = require('node:fs');
const { resolve } = require('node:path');

const filePath = resolve(__dirname, 'text.txt');

readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
