"use strict";

require('dotenv').config();

const server = require('./lib/server');

server.start(process.env.PORT, () => {
  console.log(`Your server is running on PORT ${process.env.PORT}`);
});
