'use strict';

// Initialize packages
const util = require('util');            // Deep inspection of objects
const boxSDK = require('box-node-sdk');  // Box SDK
const fs = require('fs');                // File system for config

// Fetch config file for instantiating SDK instance
const configJSON = JSON.parse(fs.readFileSync('config.json'));

// Instantiate instance of SDK using generated JSON config
const sdk = boxSDK.getPreconfiguredInstance(configJSON);

// Create service account client
const client = sdk.getAppAuthClient('enterprise');

/****************************************************************
* Update Webhook
****************************************************************/
const webhookId = '66401437';
const newTrigger = client.webhooks.triggerTypes.FILE.UPLOADED;

client.webhooks.update(webhookId,  { address: 'https://example.com/endpoint' }).then(webhook => {
  console.log(util.inspect(webhook, false, null));
});