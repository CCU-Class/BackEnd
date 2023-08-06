const { Pool, Client } = require('pg')
require('dotenv').config();

const connection = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//     } else {
//         console.log('Connected to the database successfully!');
//     }
// });

module.exports = connection;