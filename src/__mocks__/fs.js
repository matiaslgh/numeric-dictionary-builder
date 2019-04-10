const fs = jest.genMockFromModule('fs');

const mockFiles = {};

fs.appendFileSync = jest.fn((filename, content) => {
  if (!mockFiles[filename]) {
    mockFiles[filename] = '';
  }

  mockFiles[filename] += content;
});

fs._getMockFiles = () => mockFiles;

module.exports = fs;
