'use strict';

// Initialize packages
const app = require('express')();        
const util = require('util');            
const http = require('http');
const bodyParser = require('body-parser');

app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({ extended: false })); 

// Render element via serviceName = contentExplorer, contentPicker, contentPreview, contentUploader
app.post('/', (req, res) => {
  const data = req.body;
  let trigger = '';
  let webhookId = '';
  let sourceId = '';
  let sourceType = '';  

  if (data) {
    if (data.trigger) trigger = data.trigger;
    if (data.webhook && data.webhook.id) webhookId = data.webhook.id;
    if (data.source && data.source.id) sourceId = data.source.id;
    if (data.source && data.source.type) sourceType = data.source.type;

    console.log(`[${trigger}]: Webhook ID ${webhookId}, ${sourceType} ID ${sourceId}`);
  }  
});

// Create server
http.createServer(app).listen(3000, () => {
  console.log('Server started: Listening on port 3000');
});
