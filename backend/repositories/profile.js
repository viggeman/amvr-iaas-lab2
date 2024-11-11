const db = require('../utils');

exports.getProfile = async (req, res) => {
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

// module.exports = getProfile;

exports.editProfile = async (req, res) => {
  const {
    role,
    firstName,
    lastName,
    emailAddress,
    password,
    dateOfBirth,
    address,
    id,
  } = req.body;
  try {
    const text = `
      UPDATE app_user as au
        SET
        role = $1,
        first_name = $2,
        last_name = $3,
        email_address = $4,
        password = $5,
        date_of_birth = $6,
        address = $7
      WHERE
        au.id = $8
        `;
    const values = [
      role,
      firstName,
      lastName,
      emailAddress,
      password,
      dateOfBirth,
      address,
      id,
    ];
    const result = await db.query(text, values);
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching data');
  }
};
// Delete a user
exports.deleteProfile = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await db.query(
      'DELETE from app_user WHERE app_user.id = $1',
      [id]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching data');
  }
};
