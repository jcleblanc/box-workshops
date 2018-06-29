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
const configJSON = JSON.parse(fs.readFileSync('config.json'));

// Instantiate instance of SDK using generated JSON config
const sdk = boxSDK.getPreconfiguredInstance(configJSON);

// Create service account client
const client = sdk.getAppAuthClient('enterprise');

// Set service account to use as-user header
client.asUser('14516989');

/**************************************************************
* Setup metadata information
**************************************************************/
const fileId = '299905272211';
const metadataTemplate = 'boxSkillsCards';
const metadata = { cards: [{
    created_at: new Date().toISOString(),
    type: 'skill_card',
    skill_card_type: 'keyword',
    title: 'Topics',
    skill: {
      type: 'service',
      id: 'box-skill-vb-audio-analysis-node'
    },
    invocation: {
      type: 'skill_invocation',
      id: fileId
    },
    entries: [{
        type: 'text',
        text: 'Keyword'
    }]
  }]};

/**************************************************************
* Add or update metadata
**************************************************************/
client.files.addMetadata(fileId, client.metadata.scopes.GLOBAL, metadataTemplate, metadata).then((err, metadata) => {
    console.log("ADDING----------------------------------------------------------------");
  }).catch(function (err) {
    if (err.response && err.response.body && err.response.body.code === 'tuple_already_exists') {
      console.log("CONFLICT----------------------------------------------------------------");

      const jsonPatch = [{ op: 'replace', path: '/cards/0', value: metadata.cards[0] }];

      client.files.updateMetadata(fileId, client.metadata.scopes.GLOBAL, metadataTemplate, jsonPatch).then((err, metadata) => {
        console.log("UPDATED----------------------------------------------------------------");
      }).catch(function (err) {
        console.log(err.response.body);
      });
    } else {
      console.log(err.response.body);
    }
  });