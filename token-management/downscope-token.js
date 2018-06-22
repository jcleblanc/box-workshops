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
* Downscope token
****************************************************************/
const scopes = ['item_preview', 'item_upload'];
const file = 'https://api.box.com/2.0/files/281739622236';
const folder = 'https://api.box.com/2.0/folders/33552487093';

client.exchangeToken(scopes, folder).then(downscopedToken => { 
  console.log(util.inspect(downscopedToken, false, null));
  
  var dsclient = sdk.getBasicClient(downscopedToken.accessToken);
  
  //FILE UPLOAD
  const stream = fs.createReadStream('temp.txt');
  dsclient.files.uploadFile('33552487093', 'tempdoc.txt', stream, callback);
});

function callback(err, res) {
  console.log(util.inspect(err, false, null));
  console.log(util.inspect(res, false, null));
}