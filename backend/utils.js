const dotenv = require('dotenv');
const { Client } = require('pg');
dotenv.config();
console.log(process.env.PGURI);

const client = new Client({
  connectionString: process.env.PGURI,
});

module.exports = client;
