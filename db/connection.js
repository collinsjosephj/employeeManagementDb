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
        console.log("Connected to Db!");
        return connection;

    } catch (err) {
        console.error("Error has occured connecting to the database:", err);
        throw err;
    }
}

module.exports = connectToDb;