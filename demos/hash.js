

var crypto = require('crypto');

var password = "bq7/65@'JxD;2CeS";

var hash = crypto.createHash('sha3-512').update(password).digest('hex');

console.log("The result of hashing " + password + " is:\n\n" + hash + "\n\n");

// You should see in the console 000c285457fc971f862a79b786476c78812c8897063c6fa9c045f579a3b2d63f