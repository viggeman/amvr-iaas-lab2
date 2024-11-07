const db = require('../utils');

const getProfile = async (req, res) => {
  const { id } = req.query;
  try {
    const users = await db.query('SELECT * FROM app_user WHERE id = $1', [id]);
    console.log(users.rows);
    return res.status(200).json(users.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching data');
  }
};

module.exports = getProfile;
