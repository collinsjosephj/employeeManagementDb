const { prompt } = require("inquirer");
const mysql = require('mysql2');
const fs = require('fs');
const db = require('./db');

// Main Menu Functions
function mainMenu() {
    inquirer.prompt({
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
    }).then(answer => {
        switch (answer.action) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'View employees by department':
                viewEmployeesByDepartment();
                break;
            case 'View employees by manager':
                viewEmployeesByManager();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Remove an employee':
                removeEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Update an employee manager':
                updateEmployeeManager();
                break;
            case 'Remove a department':
                removeDepartment();
                break;
            case 'View utilized budget by department':
                viewUtilizedBudgetByDepartment();
                break;
            case 'Remove a role':
                removeRole();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
}