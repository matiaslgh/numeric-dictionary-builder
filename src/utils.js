function removeFirstUnderscores(string) {
  return /[-]*(.+)/.exec(string)[1];
}

module.exports.removeFirstUnderscores = removeFirstUnderscores;
