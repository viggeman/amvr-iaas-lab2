const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const db = require('./utils');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

db.connect();

app.use(express.json());
app.get('/api', async (_request, response) => {
  try {
    response.status(200).send('Hello World FROM API');
  } catch (error) {
    console.error(error);
    response.status(500).send('Error ');
  }
});

app.get('/api/users', async (_request, response) => {
  try {
    const users = await db.query('SELECT * FROM app_user');
    response.status(200).json(users.rows);
  } catch (error) {
    console.error(error);
    response.status(500).send('Error ');
  }
});

// app.use('/api/users', userRoutes);

// app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
