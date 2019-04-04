const fs = require('fs');

const PREFIX = '014';
const INIT = 17000000;
const END = 99999999;
const BATCH_SIZE = 1000000;
const FILE_NAME = `${PREFIX}-DNI-completo`;

let init = INIT;
let end = INIT + BATCH_SIZE;

while (end !== END) {
  let batch = '';
  for (let i = init; i <= end; i++) {
    batch += PREFIX + i + '\n';
  }

  fs.appendFileSync(FILE_NAME, batch);
  init = end + 1;
  end = Math.min(end + 1 + BATCH_SIZE, END);
}
