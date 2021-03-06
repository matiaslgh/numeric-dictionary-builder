const { getScriptName } = require('../utils');
const showHelp = require('./showHelp');

jest.mock('chalk', () => ({
  yellow: text => `yellow(${text})`,
  gray: text => `gray(${text})`,
}));

global.console = {
  log: jest.fn(),
};

describe('showHelp(...)', () => {
  const { log } = global.console;

  it('shows the help with the description of every option', () => {
    const helpData = {
      a: {
        aliases: [],
        description: 'This is an a',
      },
      test: {
        aliases: ['t'],
        description: 'This is a test',
      },
      other: {
        aliases: [],
        description: 'This is other example',
      },
    };

    // use getScriptName() because it's 'jest' when it's run individually
    // and 'processChild.js' when it's run as a process child
    let expected = `  Usage: yellow(${getScriptName()}) gray([options])\n\n`;
    expected += '  Options:\n';
    expected += '    yellow(--help, -h)\tgray(Output usage information)\n';
    expected += '    yellow(-a)\tgray(This is an a)\n';
    expected += '    yellow(--test, -t)\tgray(This is a test)\n';
    expected += '    yellow(--other)\tgray(This is other example)\n';

    showHelp(helpData);

    expect(log).toHaveBeenLastCalledWith(expected);
  });

  it("show the provided examples using the script's original name", () => {
    const helpData = {
      test: {
        aliases: ['t'],
        description: 'This is a test',
      },
    };

    const examplesData = [
      { usage: '', description: 'description' },
      { usage: '-t 123', description: 'This is a test 123' },
    ];

    // use getScriptName() because it's 'jest' when it's run individually
    // and 'processChild.js' when it's run as a process child
    let expected = `  Usage: yellow(${getScriptName()}) gray([options])\n\n`;
    expected += '  Options:\n';
    expected += '    yellow(--help, -h)\tgray(Output usage information)\n';
    expected += '    yellow(--test, -t)\tgray(This is a test)\n\n';
    expected += '  Examples:\n';
    expected += `    yellow(${getScriptName()})\tgray(description)\n`;
    expected += `    yellow(${getScriptName()} -t 123)\tgray(This is a test 123)\n`;

    showHelp(helpData, examplesData);

    expect(log).toHaveBeenLastCalledWith(expected);
  });
});
