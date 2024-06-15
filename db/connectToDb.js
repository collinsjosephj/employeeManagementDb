const mysql = require("mysql2/promise");

async function connectToDb() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log("Success connecting to SQL DB!");
        return connection;

    } catch (err) {
        console.error("ERROR CONNECTING TO DB:", err);
        throw err;
    }
}

module.exports = connectToDb;