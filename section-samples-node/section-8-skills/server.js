const bodyParser = require('body-parser') // Body Parser for JSON encoded bodies
const boxSDK = require('box-node-sdk');   // Box SDK
const clarifai = require('clarifai');     // Clarifai SDK
const config = require('./config.js')     // Keys and config
const express = require('express')();     // Express
const http = require('http');             // HTTP server
const util = require('util');             // Deep inspection of objects

express.use(bodyParser.json());
express.use(bodyParser.urlencoded({
  extended: true
})); 

express.post('/', (req, res) => {
  // Capture file ID and tokens from Box event
  let body = req.body;
  let fileId = body.source.id;
  let readToken = body.token.read.access_token;
  let writeToken = body.token.write.access_token;
  
  // Instantiate a new Clarifai app instance
  const app = new clarifai.App({
    apiKey: config.clarifaiKey
  });

  // Create new Box SDK instance
  const sdk = new boxSDK({
    clientID: config.boxClientId,
    clientSecret: config.boxClientSecret
  });
  let client = sdk.getBasicClient(writeToken);
  
  // Create shared link to the file with write token
  const fileURL = `https://api.box.com/2.0/files/${fileId}/content?access_token=${readToken}`;
  
  // predict the contents of an image by passing in a url
  app.models.predict(clarifai.GENERAL_MODEL, fileURL).then(
    function(response) {
      // Capture all categories
      let entries = [];
      for (let category of response.outputs[0].data.concepts) {
        if (category.value > 0.9) {
          entries.push({ type: 'text', text: category.name });
        }
      }
      
      // Set Box metadata template information
      const metadataTemplate = 'boxSkillsCards';
      const metadata = { 
        cards: [{
          created_at: new Date().toISOString(),
          type: 'skill_card',
          skill_card_type: 'keyword',
          skill_card_title: {
            message: 'Categories'
          },
          skill: {
            type: 'service',
            id: 'jleblanc-clarifai-heroku'
          },
          invocation: {
            type: 'skill_invocation',
            id: fileId
          },
          entries: entries
        }]};
        
        client.files.addMetadata(fileId, client.metadata.scopes.GLOBAL, metadataTemplate, metadata).then((err, metadata) => {
          console.log("Metadata add complete");
        }).catch(function (err) {
          if (err.response && err.response.body && err.response.body.code === 'tuple_already_exists') {
            const jsonPatch = [{ op: 'replace', path: '/cards/0', value: metadata.cards[0] }];

            client.files.updateMetadata(fileId, client.metadata.scopes.GLOBAL, metadataTemplate, jsonPatch).then((err, metadata) => {
              console.log("Metadata update complete");
            }).catch(function (err) {
              console.log(err.response.body);
            });
          } else {
            console.log(err.response.body);
          }
        });
      },
      function(err) {
        console.error(err);
      }
    );
});

// Create server
const port = process.env.PORT || 3000;
http.createServer(express).listen(port, () => {
  console.log(`Server started: Listening on port ${port}`);
});