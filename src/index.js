const args = require('./args');
const parsedArgsHandler = require('./parsedArgsHandler');
const defaults = require('./defaults');

args
  .option(['prefix', 'p'], 'Text to be added before the generated numbers', defaults.PREFIX)
  .option(['suffix', 's'], 'Text to be added after the generated numbers', defaults.SUFFIX)
  .option(['init', 'i'], 'First number of the sequence', defaults.INIT)
  .option(['end', 'e'], 'Last number of the sequence', defaults.END)
  .option(
    ['batchSize', 'b'],
    'Amount of generated keys saved in memory before adding them into the output file',
    defaults.BATCH_SIZE
  );

parsedArgsHandler(args.parse(process.argv));
