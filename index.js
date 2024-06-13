const { prompt } = require("inquirer");
const mysql = require('mysql2');
const fs = require('fs');
const db = require('./db');

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
                connection.end();
                break;
        }
    } catch (err) {
        console.error("Error:", err);
    }
}
