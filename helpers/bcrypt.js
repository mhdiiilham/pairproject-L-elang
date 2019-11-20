const bcrypt = require('bcryptjs');

function encrypt(password) {
    const saltRounds = 10;
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

function compare(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = { encrypt, compare };