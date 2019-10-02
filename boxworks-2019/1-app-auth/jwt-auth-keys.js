'use strict';

// Initialize packages
const util = require('util');            // Deep inspection of objects
const boxSDK = require('box-node-sdk');  // Box SDK
const fs = require('fs');                // File system for config

/**************************************************************
* Setup auth via manual public / private keys
**************************************************************/
// Fetch private key for signing the JWT
const jwtClientId = '1xy8yqzr9tyvloui0nk9mrmhgpr3c6pv';
const jwtClientSecret = 'NGGGoDYDVTdokOUI4jGTuWA8xuQYs6hl';
const publicKeyId = '1h9yaj1t';
const enterpriseId = '17404983';
const keyPath = 'private.pem';
const keyPass = 'e3kbsa';

const secret = fs.readFileSync(keyPath);

const sdk = new boxSDK({
  clientID: jwtClientId,
  clientSecret: jwtClientSecret,
  appAuth: {
    keyID: publicKeyId,
    privateKey: secret,
    passphrase: keyPass
  }
});
const client = sdk.getAppAuthClient('enterprise', enterpriseId);
console.log(util.inspect(client, false, null));