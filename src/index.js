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
  )
  .example(
    '-p 014 -p 004 -p 024 -i 170000 -e 999999 -i 1700000 -e 9999999 -i 17000000 -e 99999999',
    "Generates the file with 014{170k-999999}, 004{170k-999999}, 024{170k-999999}.. And the same for the other 2 ranges (1,7m to 9m and 17m to 99m).. Ideal for fibertel's default wifi password "
  );

parsedArgsHandler(args.parse(process.argv));
