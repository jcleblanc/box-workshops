'use strict';

// Initialize packages
const util = require('util');            // Deep inspection of objects
const boxSDK = require('box-node-sdk');  // Box SDK
const fs = require('fs');                // File system for config

/**************************************************************
* Setup auth via manual public / private keys
**************************************************************/
// Fetch private key for signing the JWT
const jwtClientId = 'YOUR CLIENT ID';
const jwtClientSecret = 'YOUR CLIENT SECRET';
const publicKeyId = 'YOUR APP PUBLIC KEY ID';
const enterpriseId = 'YOUR APP ENTERPRISE ID';
const keyPath = 'private.pem';
const keyPass = 'PRIVATE KEY PASSWORD';

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