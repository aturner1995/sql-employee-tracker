const mysql = require('mysql2');
const table = require('console.table');
const inquirer = require('inquirer');
var figlet = require('figlet');
require('dotenv').config();

const { viewDepartments, viewEmployees, viewRoles, viewEmployeesByManager, viewEmployeesByDepartment, viewDepartmentBudget } = require('./lib/view.js');
const { addRole, addDepartment, addEmployee, addManager } = require('./lib/add.js');
const { updateEmployeeRole, updateEmployeeManager } = require('./lib/update.js');
const { deleteEmployee, deleteDepartment, deleteRole } = require('./lib/delete.js');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: process.env.MY_SQL_PASSWORD,
        database: 'employeetracker_db'
    },
    console.log(`Connected to the emplyeetracker_db database.`)
);
// check the database connection and program starts if there are no errors
db.connect((err) => {
    if (err) throw err;
    figletArt();
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
                'View employees by Manager',
                'View employees by department',
                'View department budget',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Add a Manager',
                'Update an employee role',
                'Update an employee Manager',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'Exit'
            ]
        },
    ]).then((answer) => {
        switch (answer.initialPrompt) {
            case 'View all departments':
                // Call a function to handle viewing all departments
                viewDepartments(db, startPrompt);
                break;
            case 'View all roles':
                // Call a function to handle viewing all roles
                viewRoles(db, startPrompt);
                break;
            case 'View all employees':
                // Call a function to handle viewing all employees
                viewEmployees(db, startPrompt);
                break;
            case 'View employees by Manager':
                // Call a function to handle viewing all employees by role
                viewEmployeesByManager(db, startPrompt);
                break;
            case 'View employees by department':
                // Call a function to handle viewing all employees by dept
                viewEmployeesByDepartment(db, startPrompt);
                break;
            case 'View department budget':
                // Call a function to handle viewing all employees by dept
                viewDepartmentBudget(db, startPrompt);
                break;
            case 'Add a department':
                // Call a function to handle adding a department
                addDepartment(db, startPrompt);
                break;
            case 'Add a role':
                // Call a function to handle adding a role
                addRole(db, startPrompt);
                break;
            case 'Add an employee':
                // Call a function to handle adding an employee
                addEmployee(db, startPrompt);
                break;
            case 'Add a Manager':
                // Call a function to add a manager
                addManager(db, startPrompt);
                break;
            case 'Update an employee role':
                // Call a function to handle updating an employee's role
                updateEmployeeRole(db, startPrompt);
                break;
            case 'Update an employee Manager':
                // Call a function to handle updating an employee's manager
                updateEmployeeManager(db, startPrompt);
                break;
            case 'Delete a department':
                // Call a function to handle deleting dept
                deleteDepartment(db, startPrompt);
                break;
            case 'Delete a role':
                // Call a function to handle deleting a role
                deleteRole(db, startPrompt);
                break;
            case 'Delete an employee':
                // Call a function to handle deleting an employee
                deleteEmployee(db, startPrompt);
                break;
            case 'Exit':
                // End the connection and exit the application
                console.log('Goodbye!');
                db.end();
                process.exit();

        }
    })
        .catch((err) => {
            console.log(err);
        })
};

const figletArt = () => {
    figlet('Employee Tracker', (err, data) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
        startPrompt();
    })
}


