'use strict';

const smartcar = require('smartcar');

// cars
const lexus = new smartcar.Vehicle(
  '', // vehicle id
  ''  // access token
);
const volkswagen = new smartcar.Vehicle(
  '', // vehicle id
  ''  // access token
);

const accessToken = '';

smartcar.getVehicleIds(accessToken)
  .then(function(response) {
    const vid = response.vehicles[0];
    const tesla = new smartcar.Vehicle(vid, accessToken);
    return Promise.all([
      tesla.unlock(),
      volkswagen.unlock(),
      lexus.unlock(),
    ]);
  });
