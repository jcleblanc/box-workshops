'use strict';

// Initialize packages
const util = require('util');            // Deep inspection of objects
const boxSDK = require('box-node-sdk');  // Box SDK
const fs = require('fs');                // File system for config

/**************************************************************
* Setup auth via downloaded JSON config file
**************************************************************/
// Fetch config file for instantiating SDK instance
const configJSON = JSON.parse(fs.readFileSync('config.json'));

// Instantiate instance of SDK using generated JSON config
const sdk = boxSDK.getPreconfiguredInstance(configJSON);

// Create service account client
const client = sdk.getAppAuthClient('enterprise');

/**************************************************************
* Create new managed user
**************************************************************/
const userName = 'Managed User 1';
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
});