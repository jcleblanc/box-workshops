'use strict';

// Initialize packages
const app = require('express')();        // Express
const util = require('util');            // Deep inspection of objects
const boxSDK = require('box-node-sdk');  // Box SDK
const fs = require('fs');                // File system for config
const http = require('http');
require('pug');

// Set pug options
app.set('views', './templates');
app.set('view engine', 'pug');

// Fetch config file for instantiating SDK instance
const configJSON = JSON.parse(fs.readFileSync('config.json'));

// Instantiate instance of SDK using generated JSON config
const sdk = boxSDK.getPreconfiguredInstance(configJSON);

// Create service account client
const client = sdk.getAppAuthClient('enterprise');

// Render element via serviceName = contentExplorer, contentPicker, contentPreview, contentUploader
app.get('/', (req, res) => {
  const scopes = ['base_explorer', 'item_preview', 'item_download', 'item_rename', 'item_share', 'item_delete'];
  const folder = 'https://api.box.com/2.0/folders/33552487093';

  client.exchangeToken(scopes, folder).then((tokenInfo) => {
    // Render pug template sample, passing in downscoped token and the file / folder ID to render
    res.render('contentExplorer', { at: tokenInfo.accessToken, fid: '33552487093' });
  }).catch((err) => {
    console.error(err.response.body);
  });
});

// Create server
http.createServer(app).listen(3000, () => {
  console.log('Server started: Listening on port 3000');
});