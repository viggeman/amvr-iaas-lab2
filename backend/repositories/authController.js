const db = require('../utils'); // This works without issues
const bcrypt = require('bcrypt');

// Show all registered authorized users
exports.getAllAuth = async (req, res) => {
    try {
        const authorizedUsers = await db.query(`
            SELECT * FROM app_user;
        `);
        return res.status(200).json(authorizedUsers.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error fetching data');
    }
};

exports.checkAuth = async (req, res) => {
    const { email, password } = req.body;

    // Debugging: Log incoming email and password
    console.log("Email from request:", email);  // Logs the received email
    console.log("Password from request:", password);  // Logs the received password (for debugging)

    try {
        // Query to find the user by email
        const userResult = await db.query(`
            SELECT * FROM app_user WHERE email_address = $1;
        `, [email]);

        // Check if user exists in the database
        if (userResult.rows.length === 0) {
            console.log("No user found with the provided email");  // Debugging log if no user found
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = userResult.rows[0];
        console.log("User found:", user);  // Log the user data from the database for debugging

        // Ensure the password is hashed before comparing
        const isHashedPassword = user.password.startsWith('$2a$') || user.password.startsWith('$2b$') || user.password.startsWith('$2y$');
        if (!isHashedPassword) {
            console.log("Password in database is not hashed. Please hash passwords before storing them.");
            return res.status(500).json({ message: 'Server error: Unhashed password detected' });
        }

        // Use bcrypt to compare the plaintext password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match status:", passwordMatch);  // Debugging log for password match status

        // Check the password match result
        if (passwordMatch) {
            return res.status(200).json({ message: `Welcome, ${user.first_name}!`, success: true });
        } else {
            console.log("Password does not match");  // Debugging log if password mismatch
            return res.status(401).json({ message: 'Invalid email or password' });
        }

    } catch (error) {
        console.error("Error during authentication:", error);  // Log any errors during the authentication process
        return res.status(500).json({ message: 'An error occurred while authenticating' });
    }
};
