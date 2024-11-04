const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

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

//GET all users
app.get('/api/users', async (_request, response) => {
  try {
    const users = await client.query('SELECT * FROM app_user');
    response.status(200).json(users.rows);
  } catch (error) {
    console.error(error);
    response.status(500).send('Error ');
  }
});

//GET one user
app.get('/api/users/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const user = await client.query('SELECT * FROM app_user WHERE id = $1', [
      id,
    ]);
    if (user.rows.length === 0) {
      response.status(404).send('User not found');
    } else {
      response.status(200).json(user.rows[0]);
    }
  } catch (error) {
    console.error(error);
    response.status(500).send('Error');
  }
});

app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
