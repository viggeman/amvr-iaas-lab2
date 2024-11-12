const db = require('../utils');  // Database utility (for querying)
const bcrypt = require('bcrypt');

// Create new user in the database
exports.createUser = async (req, res) => {
    const { email, password } = req.body;

    console.log("Received data:", email, password);

    try {
        // Check if the user already exists in the database
        const userResult = await db.query('SELECT * FROM app_user WHERE email_address = $1', [email]);
        console.log('User query result:', userResult);  // Log the query result

        if (userResult.rows.length > 0) {
            // If user already exists, return 400 error
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);  // Log the hashed password

        // Insert the new user into the database
        await db.query(
            'INSERT INTO app_user (email_address, password) VALUES ($1, $2)',
            [email, hashedPassword]
        );

        // Return success message
        return res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        console.error('Error creating user:', error);  // Log error details
        return res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};
