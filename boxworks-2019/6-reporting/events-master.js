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
* Listen to the user event stream
****************************************************************/
/*client.events.getEventStream(function(err, stream) {
	if (err) { console.log(util.inspect(err, false, null)); }

	stream.on('data', function(event) {
		console.log(util.inspect(event, false, null));
	});
});*/

/****************************************************************
* Stop the long polling stream
****************************************************************/
//client.events.destroy();

/****************************************************************
* Poll the event stream between dates
****************************************************************/
/*client.events.getEnterpriseEventStream({
  //eventTypeFilter: [client.events.enterpriseEventTypes.UPLOAD, client.events.enterpriseEventTypes.LOGIN],
  startDate: '2019-09-01T00:00:00-08:00',
  endDate: '2019-09-20T00:00:00-08:00',
  pollingInterval: 0
}, function(err, stream) {
	if (err) { console.log(util.inspect(err, false, null)); }

	stream.on('data', function(events) {
		console.log(util.inspect(events, false, null));
	});

	stream.on('end', function(events) {
		console.log('End of stream');
	});
});*/