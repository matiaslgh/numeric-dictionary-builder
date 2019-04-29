## Numeric Dictionary Builder
Script to build a dictionary file, with a list of numbers (with optional prefix/suffix).

## Motivation
The dictionary is useful to apply brute force. In my case, I was playing a little with [aircrack](http://aircrack-ng.org/) to crack WPA/2 WiFi passwords. Anyway, with [this version](https://github.com/matiaslgh/numeric-dictionary-builder/commit/d705353e2bee8e4db4b36468d037742b3849e2a5) was enough to create the dictionary, but I decided to write a nicer solution with TDD to have a project to show when it's required.

## Screenshots
TODO: Complete this

## Features
TODO: Complete this

## Installation
`npm install`

`npm run build`

This is going to create dist/genDictionary.js which is the script you can use to build your dictionaries!

## Tests
`npm test`

It will run all the tests showing the coverage. Currently everything is at 100% :)

`npm run watch`

It will run the tests in watch mode. Useful to develop with TDD.

## How to use?
`node dist/genDictionary.js --help`
```
  Usage: genDictionary.js [options]

  Options:
    --help, -h        Output usage information
    --prefix, -p      Text to be added before the generated numbers
    --suffix, -s      Text to be added after the generated numbers
    --init, -i        First number of the sequence
    --end, -e         Last number of the sequence
    --batchSize, -b   Amount of generated keys saved in memory before adding them into the output file

  Examples:
    genDictionary.js -p 014 -p 004 -p 024 -i 170000 -e 999999 -i 1700000 -e 9999999 -i 17000000 -e 99999999	Generates the file with 014{170k-999999}, 004{170k-999999}, 024{170k-999999}.. And the same for the other 2 ranges (1,7m to 9m and 17m to 99m).. Ideal for fibertel's default wifi password
```

## Contribute
TODO: Complete this

## License
TODO: Complete this