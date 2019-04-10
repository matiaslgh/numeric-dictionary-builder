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

  while (batchEnd <= end) {
    let batch = '';
    for (let i = batchInit; i <= batchEnd; i++) {
      batch += prefix + i + suffix + '\n';
    }

    fs.appendFileSync(defaults.FILENAME, batch);
    batchInit = batchEnd + 1;
    batchEnd = batchEnd + 1 + batchSize;
  }
}

module.exports = dictionaryBuilder;
