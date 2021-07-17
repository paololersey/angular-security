
var jwt = require('jsonwebtoken');
var fs = require('fs');


var privateKey = fs.readFileSync('./demos/private.key');

var payload = {
  data: 'Whatever not sensitive'
};


var token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: 60,
    subject: "1"
});


console.log('RSA 256 JWT', token);





