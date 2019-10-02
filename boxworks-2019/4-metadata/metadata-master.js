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
* Create Metadata Template
****************************************************************/
/*
// CREATE METADATA TEMPLATE
const templateArr = [{
  key: 'id',
  type: 'float',
  displayName: 'Employee ID'
},{
  key: 'name',
  type: 'string',
  displayName: 'Employee Name'
},{
  key: 'position',
  type: 'string',
  displayName: 'Employee Position'
}];

const optionsObj = {
  hidden: false,
  templateKey: 'employeeData4'
};

client.metadata.createTemplate('Employee Data2', templateArr, optionsObj).then(template => {
  console.log(util.inspect(template, false, null));
}).catch(function (err) {
  console.log(util.inspect(err.response.body, false, null));
});*/


/****************************************************************
* Update Metadata Template
****************************************************************/
/*const scope = 'enterprise';
const templateKey = 'employeeData3';

const newFieldData  = [{
  op: 'editField',
  fieldKey: 'id',
  data: { 
    displayName : 'Identification FY19' 
  }
}];

client.metadata.updateTemplate(scope, templateKey, newFieldData).then(template => {
  console.log(util.inspect(template, false, null));
}).catch(function (err) {
  console.log(util.inspect(err.response.body, false, null));
});*/

/****************************************************************
* Get Metadata Template
****************************************************************/
/*const scope = 'enterprise';
const templateKey = 'employeeData3';

client.metadata.getTemplateSchema(scope, templateKey).then(template => {
  console.log(util.inspect(template, false, null));
}).catch(function (err) {
  console.log(util.inspect(err.response.body, false, null));
});*/

/****************************************************************
* Delete Metadata Template
****************************************************************/
/*const scope = 'enterprise';
const templateKey = 'employeeData3';

client.metadata.deleteTemplate(scope, templateKey).then(res => {
  console.log("Template Deleted");
}).catch(function (err) {
  console.log(util.inspect(err.response.body, false, null));
});*/

/****************************************************************
* Set Metadata on File
****************************************************************/
/*var fileId = '449869990728';

var metadataValues = {
	id: 1234,
	name: 'Developer Llama',
  position: 'Lead'
};

client.files.addMetadata(fileId, client.metadata.scopes.ENTERPRISE, "employeeData4", metadataValues).then(metadata => {
  console.log(util.inspect(metadata, false, null));
}).catch(function (err) {
  console.log(util.inspect(err.response.body, false, null));
});*/
