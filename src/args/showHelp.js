const { yellow, gray } = require('chalk');

const getScriptName = () => {
  const pathArr = process.argv[1].split('/');
  return pathArr[pathArr.length - 1];
};

const buildUsage = () => `  Usage: ${yellow(getScriptName())} ${gray('[options]')}`;

const buildOptions = helpData => {
  let text = '  Options:\n';
  Object.keys(helpData).forEach(realName => {
    const { aliases, description } = helpData[realName];
    text += `    ${yellow([realName, ...aliases].join(', '))}`;
    text += `\t${gray(description)}\n`;
  });

  return text;
};

module.exports = function showHelp(helpData) {
  const usage = buildUsage();
  const options = buildOptions(helpData);
  console.log(`${usage}\n\n${options}`);
};
