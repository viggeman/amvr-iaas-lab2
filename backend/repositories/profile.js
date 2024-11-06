const db = require('../utils');

const getProfile = async (req, res) => {
  try {
    const users = await db.query('SELECT * FROM app_user');
    console.log(users.rows);
    return res.status(200).json(users.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching data');
  }
};

module.exports = getProfile;
