
var jwt = require('jsonwebtoken');
var fs = require('fs');


// verify an existing JWT
var existingToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiV2hhdGV2ZXIgbm90IHNlbnNpdGl2ZSIsImlhdCI6MTYzMzc2OTk0MCwiZXhwIjoxNjMzNzcwMDAwLCJzdWIiOiIxIn0.Si8S0v2vjokP34-S0jITAFoNL9p9zAFfUWrPXPSBUmgvqmmlHf5Wc9CMAVqLBp6Ab-Ow0CK0xsz-oxpO6VyQru1c02V_2dPALwB2mZUyStoNRYLSiYxXYkejTqkc4o6k8NDfwmPHgzOvWGQL-huIUQdJWbJi2wwEGeeezQw5C23l2hj5cni84ZckLSxtp1SAyq0LunErlnoKIzuBf9kPNrG78DppI6L71H06dK4CIgAZZbuMaI_xKPLa1Bc05p3uy4k-kTzh1XTcW-MYCjShZ97JpeZa53GZ57zq6KSutjN7eFqMKVqiNEjqeH3S53q2mH7OzlbraTBm3hqN3j9xmg';


var publicKey = fs.readFileSync('./public.key');


console.log("verifying");

const verify = jwt.verify(existingToken, publicKey);



console.log("Decoded JWT:", verify);

