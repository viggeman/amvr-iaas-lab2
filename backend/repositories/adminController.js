const db = require('../utils');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.query(`
      SELECT
        app_user.id, app_user.role, app_user.first_name, app_user.last_name,
        app_user.email_address, app_user.password, app_user.date_of_birth, app_user.address
      FROM app_user
      LEFT JOIN address ON app_user.address = address.id
      `);
    return res.status(200).json(users.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching data');
  }
};

exports.getUserAddress = async (req, res) => {
  const { id } = req.body;
  try {
    const address = await db.query(
      'SELECT * FROM address WHERE address.id = $1',
      [id]
    );
    return res.status(200).json(address.rows);
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
