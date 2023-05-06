const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const { mkdir, writeFile, appendFile, readFile, rename } = fs;
const { stdin, stdout, exit } = process;

const {
  stdin: input,
  stdout: output,
} = require('node:process');

const filePath = path.join(__dirname, 'newFile.txt');
/* if (!filePath) {
  writeFile(filePath, err => { if (err) throw err });
} else {
  appendFile(filePath, err => { if (err) throw err });
} */
const fileText = fs.createWriteStream(filePath);
const rl = readline.createInterface({ input, output });

readline.emitKeypressEvents(input);

if (input.isTTY)
  input.setRawMode(true);
input.on('keypress', (chunk, key) => {
  if (key && key.ctrl && key.name === 'c') {
    stdout.write('\nProcess was terminated by user\n');
    exit();
  }
});

const write = () => {
  rl.question('List your favourite movies?\nTo terminate send \'exit\' or Ctrl+C\n> ',
    (answer) => {
      if (answer.toLocaleLowerCase() === 'exit') {
        stdout.write('Process was terminated by user\n');
        rl.close();
        exit();
      }
      fileText.write(`${answer}\n`, err => {
        if (err) console.log(err.message);
        write();
      })
    })
};
process.on('exit', () => { stdout.write('Have a nice day...\n'); });
write();