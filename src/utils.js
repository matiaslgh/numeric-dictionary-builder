module.exports.removeFirstHyphens = function removeFirstHyphens(string) {
  return /[-]*(.+)/.exec(string)[1];
};

module.exports.isAnOption = function isAnOption(string) {
  if (!(typeof string === 'string')) return false;
  return string.startsWith('-');
};
