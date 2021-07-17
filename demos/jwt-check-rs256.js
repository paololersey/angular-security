
var jwt = require('jsonwebtoken');
var fs = require('fs');


// verify an existing JWT
var existingToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiV2hhdGV2ZXIgbm90IHNlbnNpdGl2ZSIsImlhdCI6MTYyNjQ5ODI3MiwiZXhwIjoxNjI2NDk4MzMyLCJzdWIiOiIxIn0.VV8SUNI7TBtxTDUL0xNZ8xYWDZ5nk9KUMPwoZIt6G5pyXJddqQpNsiHIxq9m7FrYov87mlPpSWdCV2cYqtbVtg5sS7VrI1UDucaPBIn6vMwQnPN06DEqPhOuQMktL6vV1ipYvsif0kPKfb0UxUiAAk8ee5K5vkeKWEj1AYUCaaOYLYN6RFuGK-LRFe0XOMZljHmlrh_UZgdkCrEvviRHu89vVpdQG0FFC6-mMwLc8nB3rSXduA1YLv8sqw1ZxRR7RBu-KAAt8wxfctRpCGrT2X1t-l63cNVDKUXxLSSyEWD6QCPhY_UyjklQ9B_AKwSc8G-Y3LWVu8e6ZPZ9RF8buQ';


var publicKey = fs.readFileSync('./demos/public.key');


console.log("verifying");

const verify = jwt.verify(existingToken, publicKey);



console.log("Decoded JWT:", verify);

