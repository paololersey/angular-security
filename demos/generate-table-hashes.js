

var crypto = require('crypto');
var fs = require('fs');


fs.readFile('./most-common-passwords-only.txt', 'utf-8', (err,data) =>{
    try{
        const lines = data.split(/\r?\n/);
        lines.forEach(password =>{
            var hashMD5 = crypto.createHash('md5').update(password).digest('hex');
            var hashsha1 = crypto.createHash('sha1').update(password).digest('hex');
            var hashsha256 = crypto.createHash('sha1').update(password).digest('hex');
            console.log("Password=" + password + ";Md5=" + hashMD5 + ";SHA1=" + hashsha1 + ";SHA256=" + hashsha256);
        })
    }
    
    catch(err){
        console.log(err);
    }
})
