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
* Create Webhook
****************************************************************/
// CREATE WEBHOOK
const fileId = '207907190751';
const notificationURL = 'https://www.jcleblanc.com/';

client.webhooks.create(
  fileId,
  client.itemTypes.FILE,
  notificationURL,
  [
    client.webhooks.triggerTypes.FILE.DOWNLOADED
  ]
).then(webhook => {
  console.log(util.inspect(webhook, false, null));
});