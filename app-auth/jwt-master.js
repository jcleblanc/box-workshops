'use strict';

// Initialize packages
const util = require('util');            // Deep inspection of objects
const boxSDK = require('box-node-sdk');  // Box SDK
const fs = require('fs');                // File system for config

/**************************************************************
* Setup auth via downloaded JSON config file
**************************************************************/
// Fetch config file for instantiating SDK instance
// SAVE YOUR OWN APP CONFIG FILE TO config.json 
/*const configJSON = JSON.parse(fs.readFileSync('config.json'));

// Instantiate instance of SDK using generated JSON config
const sdk = boxSDK.getPreconfiguredInstance(configJSON);

// Create service account client
const client = sdk.getAppAuthClient('enterprise');
console.log(util.inspect(client, false, null));
*/
/**************************************************************
* Setup auth via manual public / private keys
**************************************************************/
// Fetch private key for signing the JWT
const jwtClientId = 'YOUR CLIENT ID';
const jwtClientSecret = 'YOUR CLIENT SECRET';
const publicKeyId = 'ENTERPRISE PUBLIC KEY ID';
const enterpriseId = 'ENTERPRISE ID';
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
//console.log(util.inspect(client, false, null));

/**************************************************************
* Create new app user
**************************************************************/
/*const userName = 'App User 1';
const spaceAmount = 1073741824;   // ~ 1gb

// Create app user
client.enterprise.addAppUser(
  userName, 
  {
    space_amount: spaceAmount
  }
).then(appUser => {
  console.log(appUser.id);
});*/

/**************************************************************
* Create new managed user
**************************************************************/
/*const userName = 'Managed User 1';
const userEmail = 'managedusertest123@tester.com';
const role = client.enterprise.userRoles.COADMIN;
const address = '123 Tester Lane';
const spaceAmount = 1073741824;   // ~ 1gb

client.enterprise.addUser(
  userEmail,
  userName,
  {
    role: role,
    address: address,
    space_amount: spaceAmount
  }
).then(user => {
  console.log(util.inspect(user.id, false, null));
});*/

/**************************************************************
* Delete user
**************************************************************/
const userId = '3771881521';
client.users.delete(userId).then(() => {
  console.log(`${userId} deleted`);
});
