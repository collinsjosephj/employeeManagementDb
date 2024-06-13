const mysql = require("mysql2/promise");

async function connectToDb() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
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