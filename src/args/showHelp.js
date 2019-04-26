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

const buildExamples = (examplesData = []) => {
  if (!examplesData.length) return '';

  let text = '\n  Examples:\n';
  examplesData.forEach(({ usage, description }) => {
    text += `    ${yellow(`${getScriptName()}${usage ? ` ${usage}` : ''}`)}`;
    text += `\t${gray(description)}\n`;
  });

  return text;
};

/**
 * Shows for the stdout the provided options and examples
 */
module.exports = function showHelp(helpData, examplesData) {
  const usage = buildUsage();
  const options = buildOptions(helpData);
  const examples = buildExamples(examplesData);
  console.log(`${usage}\n\n${options}${examples}`); // eslint-disable-line no-console
};
