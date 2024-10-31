const express = require('express');
const path = require('path');
// const dotenv = require('dotenv');
// const { Client } = require('pg');

// dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// const client = new Client({
//   connectionString: process.env.PGURI,
// });

// client.connect();

app.use(express.json());

// GET
app.get('/api', async (_request, response) => {
  try {
    response.status(200).send('Hello World FROM API');
  } catch (error) {
    console.error(error);
    response.status(500).send('Error ');
  }
});

app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
