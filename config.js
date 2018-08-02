const boxSDK = require('box-node-sdk');
exports.boxSDK = boxSDK;

// OAuth / JWT application credentials
const jwtClientId = exports.jwtClientId = 'YOUR JWT APPLICATION CLIENT ID';
const jwtClientSecret = exports.jwtClientSecret = 'YOUR JWT APPLICATION CLIENT SECRET';

// OAuth application credentials
const oauthClientId = exports.oauthClientId = 'YOUR OAUTH APPLICATION CLIENT ID';
const oauthClientSecret = exports.oauthClientSecret = 'YOUR OAUTH APPLICATION CLIENT SECRET';

// Account information
const publicKeyId = exports.publicKeyId = 'YOUR APPLICATION PUBLIC KEY ID';
const enterpriseId = exports.enterpriseId = 'YOUR ENTERPRISE';
const userId = exports.userId = 'YOUR USER ID';

// Keys
const keyPath = exports.privateKeyPath = 'private.pem';
const keyPass = exports.keyPass = 'YOUR PRIVATE KEY PASSWORD';

// Config file path
const configPath = exports.configPath = 'config.json';
