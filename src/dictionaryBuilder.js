const fs = require('fs');
const defaults = require('./defaults');

function dictionaryBuilder({
  prefix = defaults.PREFIX,
  suffix = defaults.SUFFIX,
  init = defaults.INIT,
  end = defaults.END,
  batchSize = defaults.BATCH_SIZE,
} = {}) {
  if (init > end) throw new Error('End must be greater than init');

  end++; // Without this, the end wouldn't be included

  let batchInit = init;
  let batchEnd = Math.min(init + batchSize, end);
  let finish = false;

  while (!finish) {
    finish = batchEnd >= end;

    let batch = '';
    for (let i = batchInit; i < batchEnd; i++) {
      batch += prefix + i + suffix + '\n';
    }

    fs.appendFileSync(defaults.FILENAME, batch);
    batchInit = batchEnd;
    batchEnd = Math.min(batchEnd + batchSize, end);
  }
}

module.exports = dictionaryBuilder;
