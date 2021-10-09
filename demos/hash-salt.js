

var crypto = require('crypto');


var password = "bq7/65@'JxD;2CeS";
var userSalt = '103459035';

crypto.pbkdf2(password, userSalt, 100000, 512, 'sha3-512',
    function(err, hash) {

        console.log("The result of hashing " + password + " is:\n\n" +
            hash.toString('hex') + "\n\n");

    });


