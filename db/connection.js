const mysql = require("mysql2/promise");
const dotenv = require('dotenv').config();

async function connectToDb() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: process.env.DB_PASSWORD,
            database: 'employeeData_db'
        });
        console.log("Success connecting to SQL DB!");
        return connection;

    } catch (err) {
        console.error("ERROR CONNECTING TO DB:", err);
        throw err;
    }
}

module.exports = connectToDb;