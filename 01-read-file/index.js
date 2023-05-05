const fs = require('node:fs');
const { resolve } = require('node:path');
const { stdout } = process;

const filePath = resolve(__dirname, 'text.txt');
const readStream = new fs.createReadStream(filePath, 'utf8');
readStream.on('err', err => stdout.write(err));
readStream.pipe(stdout);
