const db = require('../utils');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.query('SELECT * FROM app_user');
    return res.status(200).json(users.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching data');
  }
};

exports.modifyUser = async (req, res) => {
  const { emailAddress, id } = req.body;
  console.log(req.body);
  try {
    const text = 'UPDATE app_user SET email_address = $1 WHERE id = $2';
    const values = [emailAddress, id];
    const users = await db.query(text, values);
    return res.status(200).json(users.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching data');
  }
};
