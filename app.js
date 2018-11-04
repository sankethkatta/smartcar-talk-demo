'use strict';

const CLIENT_ID = '';
const CLIENT_SECRET = '';

const smartcar = require('smartcar');
const express = require('express');
const opn = require('opn');

// 1. Create an instance of Smartcar's client
const client = new smartcar.AuthClient({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: 'http://localhost:8000/callback',
  scope: [
    'read_vehicle_info',
    'control_security',
  ],
});

// 2. Create a new webserver with the Express framework
const app = express();

// 3. Create a page with a 'Connect Car' button.
app.get('/', function(req, res, next) {
  const authUrl = client.getAuthUrl({forcePrompt: true});
  res.send(`
    <h1>Hello, Everyone!</h1>
    <a href=${authUrl}>
      <button>Connect Car</button>
    </a>
  `);
});

// 4. On an HTTP GET to our callback will exchange our OAuth Auth Code
//    for an Access Token and log it out.
app.get('/callback', function(req, res, next) {
  const code = req.query.code;
  client.exchangeCode(code)
    .then(function(access) {

      // Log the access token response
      console.log(JSON.stringify(access, null, 2));

      // Respond with a success status to browser
      res.json(access);

    });
});

// 5. Let's start up the server at port 8000 and open our web browser
//    to the OAuth Authorization URL.
app.listen(8000, function() {
  opn('http://localhost:8000', {app: 'google-chrome'});
});
