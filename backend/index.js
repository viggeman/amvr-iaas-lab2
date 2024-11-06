const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const testRoutes = require('./routes/test');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', testRoutes);

// For building dist
// app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
