'use strict';

// Initialize packages
const util = require('util');            // Deep inspection of objects
const boxSDK = require('box-node-sdk');  // Box SDK
const fs = require('fs');                // File system for config

// Fetch config file for instantiating SDK instance
// SAVE YOUR OWN APP CONFIG FILE TO config.json 
const configJSON = JSON.parse(fs.readFileSync('config.json'));

// Instantiate instance of SDK using generated JSON config
const sdk = boxSDK.getPreconfiguredInstance(configJSON);

// Create service account client
const client = sdk.getAppAuthClient('enterprise');

/****************************************************************
* Collaborate user on a folder
****************************************************************/
let collabUserId = '14516989';
let folderId = '33552487093';

// Create with user ID - methods exist for email and group ID as well
/*client.collaborations.createWithUserID(collabUserId, folderId, client.collaborationRoles.CO_OWNER).then((collaboration) => {
  console.log(collaboration);
});*/

/****************************************************************
* Remove folder collaboration
****************************************************************/
const collaborationId = '13505255103';
client.collaborations.delete(collaborationId).then(() => {
  console.log('removal successful');
});
