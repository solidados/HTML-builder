const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

const {
  stdin: input,
  stdout: output,
  exit: exit,
} = require('node:process');

const filePath = path.join(__dirname, 'myFilms.txt');
const fileText = fs.createWriteStream(filePath);
const rl = readline.createInterface({ input, output });

const newEntry = () => {
  rl.question('List your favourite movies?\nTo terminate send \'exit\' or Ctrl+C\n> ',
    (answer) => {
      if (answer.toLowerCase() === 'exit') {
        output.write('Process was terminated by user\n');
        rl.close();
        exit();
      }
      fileText.write(`${answer}\n`, err => {
        if (err) throw err;
        newEntry();
      })
    })
};
// Ctrl+C implementation:
rl.on('SIGINT', () => {
  rl.close(
    output.write('\nProcess was terminated by user\n')
  );
});

process.on('exit', () => {
  output.write('Have a nice day...\n');
});

newEntry();
