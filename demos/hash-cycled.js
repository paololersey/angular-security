

var crypto = require('crypto');
var fs = require('fs');


fs.readFile("./most-common-passwords.txt", 'utf8', (err, data) => {
    try {
        const lines = data.split(/\r?\n/);
        lines.forEach((password) => {

            console.log(password);

            var hash = crypto.createHash('sha256').update(password).digest('hex');
            hash = crypto.createHash('sha1').update(password).digest('hex');

            console.log("The result of hashing " + password + " is:\n\n" + hash + "\n\n");

        })
    }
    catch (err) {
        console.error(err);
    }

});



