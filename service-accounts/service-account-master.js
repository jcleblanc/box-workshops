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

// Set service account to use as-user header
//client.asUser('14516989');
//client.asSelf();

// Create app user client (user access token)
//const client = sdk.getAppAuthClient('user', '14516989');

// Upload file
const stream = fs.createReadStream('temp.txt');
client.files.uploadFile('0', 'tempdoc.txt', stream).then(file => {
  console.log(util.inspect(file, false, null));
}).catch(function (err) {
  console.log(util.inspect(err.response.body, false, null));
}); 
