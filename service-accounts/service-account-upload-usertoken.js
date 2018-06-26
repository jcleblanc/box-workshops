'use strict';

// Initialize packages
const util = require('util');            // Deep inspection of objects
const boxSDK = require('box-node-sdk');  // Box SDK
const fs = require('fs');                // File system for config

// Fetch config file for instantiating SDK instance
const configJSON = JSON.parse(fs.readFileSync('config.json'));

// Instantiate instance of SDK using generated JSON config
const sdk = boxSDK.getPreconfiguredInstance(configJSON);

// Create app user client (user access token)
const client = sdk.getAppAuthClient('user', '14516989');

// Upload file
var stream = fs.createReadStream('temp.txt');
client.files.uploadFile('0', 'tempdoc.txt', stream).then((err, res) => {
  console.log(util.inspect(res, false, null));
}).catch(function (err) {
  console.log(util.inspect(err.response.body, false, null));
}); 