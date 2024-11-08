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

exports.getUser = async (req, res) => {
  const id = req.query;
  try {
    const user = await db.query(
      `
      SELECT * FROM app_user
       WHERE app_user.id = $1
      `,
      [id]
    );
    return res.status(200).json(user.rows);
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
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching data');
  }
};

exports.deleteUser = async (req, res) => {
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
