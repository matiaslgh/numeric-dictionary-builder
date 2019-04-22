const { yellow, gray } = require('chalk');
const { addHyphens, getScriptName } = require('../utils');

const buildUsage = () => `  Usage: ${yellow(getScriptName())} ${gray('[options]')}`;

// TODO: Improve options indentation
const buildOptions = helpData => {
  let text = '  Options:\n';
  text += `    ${yellow('--help, -h')}`;
  text += `\t${gray('Output usage information')}\n`;
  Object.keys(helpData).forEach(realName => {
    const { aliases, description } = helpData[realName];
    const options = [realName, ...aliases].map(n => addHyphens(n));
    text += `    ${yellow(options.join(', '))}`;
    text += `\t${gray(description)}\n`;
  });

  return text;
};

module.exports = function showHelp(helpData) {
  const usage = buildUsage();
  const options = buildOptions(helpData);
  console.log(`${usage}\n\n${options}`); // eslint-disable-line no-console
};
