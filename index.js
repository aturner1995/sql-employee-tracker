const mysql = require('mysql2');
const table = require('console.table');
const inquirer = require('inquirer');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: process.env.MY_SQL_PASSWORD,
        database: 'employeetracker_db'
    },
    console.log(`Connected to the emplyeeTracker_db database.`)
);
// check the database connection and program starts if there are no errors
db.connect((err) => {
    if (err) throw err;
    startPrompt();
});

const startPrompt = () => {
    // Prompt the user when program starts
    inquirer.prompt([
        {
            type: 'list',
            name: 'initialPrompt',
            message: 'What would you like to do with the employee tracker?',
            choices: ['View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        },
    ]).then(function (answer) {
        switch (answer.initialPrompt) {
            case 'View all departments':
                // Call a function to handle viewing all departments
                viewDepartments();
                break;
            case 'View all roles':
                // Call a function to handle viewing all roles
                viewRoles();
                break;
            case 'View all employees':
                // Call a function to handle viewing all employees
                viewEmployees();
                break;
            case 'Add a department':
                // Call a function to handle adding a department
                addDepartment();
                break;
            case 'Add a role':
                // Call a function to handle adding a role
                addRole();
                break;
            case 'Add an employee':
                // Call a function to handle adding an employee
                addEmployee();
                break;
            case 'Update an employee role':
                // Call a function to handle updating an employee's role
                updateEmployeeRole();
                break;
            case 'Exit':
                // End the connection and exit the application
                connection.end();
                process.exit();
                break;
        }
    })
        .catch((err) => {
            console.log(err);
        })
};

const viewDepartments = () => {

};

const viewRoles = () => {

};

const viewEmployees = () => {

};

const addDepartment = () => {

};

const addRole = () => {

};

const addEmployee= () => {

};

const updateEmployeeRole = () => {

};

