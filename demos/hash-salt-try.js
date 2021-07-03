

var crypto = require('crypto');

var password = 'monkey';

var user1Salt = 1; // add a unique element for each user

var user2Salt = 2;

// we will use another hash other SHA-256 during the course, this is just for demo purposes
var hash = crypto.createHash('sha256').update(password + user1Salt).digest('hex');

console.log("The result of hashing " + password + " is:\n\n" + hash + "\n\n");

// You should see in the console 000c285457fc971f862a79b786476c78812c8897063c6fa9c045f579a3b2d63f

// Features:
// 1) Running multiple times npm run hash gives the same result. If it we encryption the result would be slightly different, due to the encryption key.
// 2) Given a hash, you cannot reverse it
// 3) Changing slightly the origin password (1 character), the hash completely change (average 50%) -> invulnerable to "progressive approximation attack"
// 4) very low prob that there are collisions on hash unique generated