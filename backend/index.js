const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const db = require('./utils');
const testRoutes = require('./routes/test');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/users', async (_request, response) => {
  try {
    const users = await db.query('SELECT * FROM app_user');
    response.status(200).json(users.rows);
  } catch (error) {
    console.error(error);
    response.status(500).send('Error ');
  }
});

app.use('/api', testRoutes);

// For building dist
// app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
