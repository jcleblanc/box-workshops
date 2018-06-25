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
* Create new app user
**************************************************************/
const userName = 'App User 1';
const spaceAmount = 1073741824;   // ~ 1gb

// Create app user
client.enterprise.addAppUser(
  userName, 
  {
    space_amount: spaceAmount
  }
).then(appUser => {
  console.log(appUser.id);
});