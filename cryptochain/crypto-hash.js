const createHash = require('create-hash');

const cryptoHash = (...inputs) => {
    var hash = createHash('sha256');
    hash.update(inputs.sort().join(' '));
    return hash.digest('hex')
}

module.exports = cryptoHash;