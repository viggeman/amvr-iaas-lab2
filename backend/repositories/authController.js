const db = require('../utils'); // This works without issues


//Show all registered authorized users
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
