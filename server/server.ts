

import * as express from 'express';
import {Application} from "express";

import * as fs from 'fs';
import * as https from 'https';
import {readAllLessons} from "./read-all-lessons.route";
const bodyParser = require('body-parser');

const app: Application = express();
const jwkrsa = require('jwks-rsa');
const jwt = require('express-jwt');

app.use(bodyParser.json());

const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'secure', type: Boolean,  defaultOption: true },
];

const options = commandLineArgs(optionDefinitions);

const checkIfAuthenticated = jwt({
    algorithms: ['RS256'],
    secret: jwkrsa.expressJwtSecret({
        jwksUri: "https://dev-9m0grv42.us.auth0.com/.well-known/jwks.json",
        cache: true, // Default Value
        cacheMaxEntries: 5, // Default value
        cacheMaxAge: 600000, // Defaults to 10m,
        // Against rate limiting attack. The attacker can ask the endpoint multiple times, in a massive attack. 
        // We set the rateLimit property to true
        rateLimit: true, 
        jwksRequestPerMinute: 10
    })
});

app.use(checkIfAuthenticated);
app.use((err,req,res,next) => {
    if(err && err.name=="UnauthorizedError"){
        res.status(err.status).json({message:err.message})
    }
    else{
        next();
    }
})

// REST API{}
app.route('/api/lessons')
    .get(readAllLessons);


if (options.secure) {

    const httpsServer = https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app);

    // launch an HTTPS Server. Note: this does NOT mean that the application is secure
    httpsServer.listen(9000, () => console.log("HTTPS Secure Server running at https://localhost:" + httpsServer.address().port));

}
else {

    // launch an HTTP Server
    const httpServer = app.listen(9000, () => {
        console.log("HTTP Server running at https://localhost:" + httpServer.address().port);
    });

}

