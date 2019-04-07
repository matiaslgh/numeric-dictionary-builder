function removeFirstHyphens(string) {
  return /[-]*(.+)/.exec(string)[1];
}

module.exports.removeFirstHyphens = removeFirstHyphens;
