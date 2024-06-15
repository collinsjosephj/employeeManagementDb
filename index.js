const { prompt } = require("inquirer");
const mysql = require("mysql2/promise");
//const dotenv = require('dotenv').config();
//const connectToDb = require('./db/connectToDb');

let connection;

async function connectToDb() {
    try {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'employee_data_db'
        });
        console.log("Success connecting to SQL DB!");

        // Handle connection errors and auto-reconnect
        connection.on('error', async (err) => {
            console.error("Database connection error:", err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.fatal) {
                console.log("Reconnecting to the database...");
                await connectToDb();
            }
        });

        mainMenu();
    } catch (err) {
        console.error("ERROR CONNECTING TO DB:", err);
        throw err;
    }
}


// Main Menu JS
async function mainMenu() {
    try {
        const answer = await prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'View employees by department',
                'View employees by manager',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Remove an employee',
                'Update an employee role',
                'Update an employee manager',
                'Remove a department',
                'View utilized budget by department',
                'Remove a role',
                'Exit'
            ]
        });

        switch (answer.action) {
            case 'View all departments':
                await viewAllDepartments();
                break;
            case 'View all roles':
                await viewAllRoles();
                break;
            case 'View all employees':
                await viewAllEmployees();
                break;
            case 'View employees by department':
                await viewEmployeesByDepartment();
                break;
            case 'View employees by manager':
                await viewEmployeesByManager();
                break;
            case 'Add a department':
                await addDepartment();
                break;
            case 'Add a role':
                await addRole();
                break;
            case 'Add an employee':
                await addEmployee();
                break;
            case 'Remove an employee':
                await removeEmployee();
                break;
            case 'Update an employee role':
                await updateEmployeeRole();
                break;
            case 'Update an employee manager':
                await updateEmployeeManager();
                break;
            case 'Remove a department':
                await removeDepartment();
                break;
            case 'View utilized budget by department':
                await viewUtilizedBudgetByDepartment();
                break;
            case 'Remove a role':
                await removeRole();
                break;
            case 'Exit':
                console.log("Exiting...");
                await connection.end();
                process.exit();
        }

    } catch (err) {
        console.error("ERROR HAS OCCURED:", err);
    }
}

async function viewAllDepartments() {
    try {
        //const connection = await connectToDb();
        const [results] = await connection.query('SELECT * FROM department');
        console.table(results);

    } catch (err) {
        console.error("ERROR HAS OCCURED:", err);
    } finally {
        mainMenu();
    }
}

async function viewAllRoles() {
    try {
        //const connection = await connectToDb();
        const [results] = await connection.query(`
            SELECT role.id, role.title, department.name AS department, role.salary
            FROM role
            LEFT JOIN department ON role.department_id = department.id
            `);
        console.table(results);

    } catch (err) {
        console.error("ERROR HAS OCCURED:", err);
    } finally {
        mainMenu();
    }
}

async function viewAllEmployees() {
    try {
        //const connection = await connectToDb();
        const [results] = await connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
                FROM employee 
                LEFT JOIN role ON employee.role_id = role.id 
                LEFT JOIN department ON role.department_id = department.id 
                LEFT JOIN employee manager ON manager.id = employee.manager_id
            `);
        console.table(results);
        await connection.end();

    } catch (err) {
        console.error("ERROR HAS OCCURED:", err);
    } finally {
        mainMenu();
    }
}

async function viewEmployeesByDepartment() {
    try {
        //const connection = await connectToDb();
        const [departments] = await connection.query('SELECT * FROM department');
        const answer = await prompt({
            name: 'department',
            type: 'list',
            choices: departments.map(department => ({
                name: department.name,
                value: department.id
            })),
            message: 'Please select a department:'
        });

        const [results] = await connection.query(`
            SELECT employee.id, employee.first_name, employee.last_name, role.title 
            FROM employee 
            LEFT JOIN role ON employee.role_id = role.id 
            LEFT JOIN department ON role.department_id = department.id 
            WHERE department.id = ?
        `, [answer.department]);

        console.table(results);

    } catch (err) {
        console.error("ERROR HAS OCCURED:", err);
    } finally {
        mainMenu();
    }
}

async function viewEmployeesByManager() {
    try {
        //const connection = await connectToDb();
        const [managers] = await connection.query('SELECT * FROM employee WHERE manager_id IS NULL');

        const answer = await prompt({
            name: 'manager',
            type: 'list',
            choices: managers.map(manager => ({
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id
            })),
            message: 'Please select a manager:'
        });

        const [results] = await connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department 
            FROM employee 
            LEFT JOIN role ON employee.role_id = role.id 
            LEFT JOIN department ON role.department_id = department.id 
            WHERE employee.manager_id = ?`, [answer.manager]);

        console.table(results);

    } catch (err) {
        console.error("ERROR HAS OCCURED:", err);
    } finally {
        mainMenu();
    }
}
async function addDepartment() {
    try {
        const departmentAnswer = await prompt({
            name: 'name',
            type: 'input',
            message: 'Enter the name of the department:'
        });

        const [result] = await connection.query('INSERT INTO department SET ?', { name: departmentAnswer.name });
        const newDepartmentId = result.insertId;
        console.log(`Department ${departmentAnswer.name} added!`);

        const roleAnswer = await prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the name of the role for this department:'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the salary of the role:'
            }
        ]);

        await connection.query('INSERT INTO role SET ?', {
            title: roleAnswer.title,
            salary: roleAnswer.salary,
            department_id: newDepartmentId
        });

        console.log(`Role ${roleAnswer.title} added for department ${departmentAnswer.name}!`);

    } catch (err) {
        console.error("ERROR HAS OCCURED:", err);
    } finally {
        mainMenu();
    }
}

async function addRole() {
    try {
        const [departments] = await connection.query('SELECT * FROM department');
        
        if (departments.length === 0) {
            console.log("No departments available. Please add a department first.");
            await addDepartment(); // Direct user to add a department first
            return;
        }

        const answers = await prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the name of the role:'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the salary of the role:'
            },
            {
                name: 'department',
                type: 'list',
                choices: departments.map(department => ({
                    name: department.name,
                    value: department.id
                })),
                message: 'Select the department for this role:'
            }
        ]);

        await connection.query('INSERT INTO role SET ?', {
            title: answers.title,
            salary: answers.salary,
            department_id: answers.department
        });

        console.log(`Role ${answers.title} added!`);

    } catch (err) {
        console.error("ERROR HAS OCCURED:", err);
    } finally {
        mainMenu();
    }
}

async function addEmployee() {
    try {
        //const connection = await connectToDb();
        const [roles] = await connection.query('SELECT * FROM role');
        const [departments] = await connection.query('SELECT * FROM department');
        const [employees] = await connection.query('SELECT * FROM employee');

        const answers = await prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'Enter the first name of the employee:'
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Enter the last name of the employee:'
            },
            {
                name: 'role',
                type: 'list',
                choices: roles.map(role => ({
                    name: role.title,
                    value: role.id
                })),
                message: 'Select the role for this employee:'
            },
                        {
                name: 'department',
                type: 'list',
                choices: departments.map(department => ({
                    name: department.name,
                    value: department.id
                })),
                message: 'Select the department for this employee:'
            },
            {
                name: 'manager',
                type: 'list',
                choices: [{ name: 'None', value: null }].concat(employees.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }))),
                message: 'Select the manager for this employee:'
            }
        ]);

        await connection.query('INSERT INTO employee SET ?', {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: answers.role,
            manager_id: answers.manager
        });

        console.log(`Employee ${answers.first_name} ${answers.last_name} added!`);

    } catch (err) {
        console.error("ERROR HAS OCCURED:", err);
    } finally {
        mainMenu();
    }
}
async function removeEmployee() {
    try {
       //const connection = await connectToDb();
        const [employees] = await connection.query('SELECT * FROM employee');
        const answers = await prompt({
            name: 'employee',
            type:  'list',
            choices: employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            })),
            message: 'Select the employee to remove:'
        });
        await connection.query('DELETE FROM employee WHERE id = ?', [answers.employee]);

        console.log('Employee has been removed!');

    } catch (err) {
        console.error("ERROR HAS OCCURED:", err);
    } finally {
        mainMenu();
    }
}

async function updateEmployeeRole() {
    try {
        //const connection = await connectToDb();
        const [employees] = await connection.query('SELECT * FROM employee');
        const [roles] = await connection.query('SELECT * FROM role');

        const answers = await prompt([
            {
                name: 'employee',
                type: 'list',
                choices: employees.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                })),
                message: 'Select the employee to update:'
            },
            {
                name: 'role',
                type: 'list',
                choices: roles.map(role => ({
                    name: role.title,
                    value: role.id
                })),
                message: 'Select the new role for this employee:'
            }
        ]);

        await connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.role, answers.employee]);

        console.log('Employee role updated!');

    } catch (err) {
        console.error("ERROR HAS OCCURED:", err);
    } finally {
        mainMenu();
    }
}

async function updateEmployeeManager() {
    try {
        //const connection = await connectToDb();
        const [employees] = await connection.query('SELECT * FROM employee');
        const answers = await prompt([
            {
                name: 'employee',
                type: 'list',
                choices: employees.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                })),
                message: 'Select the employee to update:'
            },
            {
                name: 'manager',
                type: 'list',
                choices: [{ name: 'None', value: null }].concat(employees.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }))),
                message: 'Select the new manager for this employee:'
            }
        ]);

        await connection.query('UPDATE employee SET manager_id = ? WHERE id = ?', [answers.manager, answers.employee]);

        console.log('Employee manager updated!');

    } catch (err) {
        console.error("ERROR HAS OCCURED:", err);
    } finally {
        mainMenu();
    }
}

async function removeDepartment() {
    try {
        //const connection = await connectToDb();
        const [departments] = await connection.query('SELECT * FROM department');
        const answers = await prompt({
            name: 'department',
            type: 'list',
            choices: departments.map(department => ({
                name: department.name,
                value: department.id
            })),
            message: 'Select the department to remove:'
        });

        await connection.query('DELETE FROM department WHERE id = ?', [answers.department]);

        console.log('Department removed!');

    } catch (err) {
        console.error("ERROR HAS OCCURED:", err);
    } finally {
        mainMenu();
    }
}

async function viewUtilizedBudgetByDepartment() {
    try {
        //const connection = await connectToDb();
        const [results] = await connection.query(`
            SELECT department.name AS department, SUM(role.salary) AS utilized_budget 
            FROM employee 
            LEFT JOIN role ON employee.role_id = role.id 
            LEFT JOIN department ON role.department_id = department.id 
            GROUP BY department.id
        `);

        console.table(results);

    } catch (err) {
        console.error("ERROR HAS OCCURED:", err);
    } finally {
        mainMenu();
    }
}

async function removeRole() {
    try {
       //const connection = await connectToDb();
        const [roles] = await connection.query('SELECT * FROM role');
        const answers = await prompt({
            name: 'role',
            type: 'list',
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            })),
            message: 'Select the role to remove:'
        });

        await connection.query('DELETE FROM role WHERE id = ?', [answers.role]);

        console.log('Role removed!');

    } catch (err) {
        console.error("ERROR HAS OCCURED:", err);
    } finally {
        mainMenu();
    }
}

connectToDb();
module.exports = connectToDb;

// Start the app
// mainMenu();
