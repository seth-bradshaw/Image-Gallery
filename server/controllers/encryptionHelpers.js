const bcrypt = require('bcryptjs');

const encrypt = (value) => bcrypt.hashSync(value, 8);

const compare = (value, hash) => bcrypt.compareSync(value, hash);

module.exports = { encrypt, compare };