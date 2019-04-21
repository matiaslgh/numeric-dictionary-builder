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

    let expected = '  Usage: yellow(jest) gray([options])\n\n';
    expected += '  Options:\n';
    expected += '    yellow(--help, -h)\tgray(Output usage information)\n';
    expected += '    yellow(-a)\tgray(This is an a)\n';
    expected += '    yellow(--test, -t)\tgray(This is a test)\n';
    expected += '    yellow(--other)\tgray(This is other example)\n';

    showHelp(helpData);

    expect(log).toHaveBeenLastCalledWith(expected);
  });
});
