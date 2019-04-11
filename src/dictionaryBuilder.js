const fs = require('fs');
const defaults = require('./defaults');

function dictionaryBuilder({
  prefix = defaults.PREFIX,
  suffix = defaults.SUFFIX,
  init = defaults.INIT,
  end = defaults.END,
  batchSize = defaults.BATCH_SIZE,
} = {}) {
  let batchInit = init;
  let batchEnd = Math.min(init + batchSize - 1, end);
  let finish = false;

  while (!finish) {
    if (batchEnd >= end) finish = true;

    let batch = '';
    for (let i = batchInit; i <= batchEnd; i++) {
      batch += prefix + i + suffix + '\n';
    }

    fs.appendFileSync(defaults.FILENAME, batch);
    batchInit = batchEnd + 1;
    batchEnd = Math.min(batchEnd + 1 + batchSize, end);
  }
}

module.exports = dictionaryBuilder;
