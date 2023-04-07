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
    console.log(`Connected to the emplyeetracker_db database.`)
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
    ]).then((answer) => {
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
                db.end();
                process.exit();
        }
    })
        .catch((err) => {
            console.log(err);
        })
};

const viewDepartments = () => {
    db.query(`SELECT * FROM departments`, (err,results) => {
        console.table(results);
        startPrompt();
    })
};

const viewRoles = () => {
    db.query(`SELECT * FROM roles`, (err,results) => {
        console.table(results);
        startPrompt();
    })
};

const viewEmployees = () => {
    db.query(`SELECT * FROM employee`, (err,results) => {
        console.table(results);
        startPrompt();
    })
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please provide the name of the new department:',
            name: 'newDepartment'
        }
    ]).then((answer) => {
        db.query(`INSERT INTO departments (name) VALUES ('${answer.newDepartment}')`)
    }).then(() => {
        console.log('Department Added');
        startPrompt();
    })
    .catch((err) => {
        if (err.code === 'ER_DUP_ENTRY') {
            console.log('ERROR: Department Already Exists');
        }
        else {
            console.log(err);
        }
        startPrompt();
    });
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please provide the title of the new role:',
            name: 'newRoleTitle'
        },
        {
            type: 'input',
            message: 'Please provide the salary of the new role:',
            name: 'newRoleSalary'
        },
        {
            type: 'input',
            message: 'Please provide the department ID of the new role:',
            name: 'newRoleDeptId'
        },
    ]).then((answer) => {
        db.query(`INSERT INTO roles (name) VALUES 
        ('${answer.newDepartment}', ${answer.newRoleSalary}, ${answer.newRoleDeptId})`)
    }).then(() => {
        console.log('New Role Added');
        startPrompt();
    })
    .catch((err) => {
        console.log(err);
        startPrompt();
    });
};

const addEmployee= () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please provide the employee first name:',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Please provide the employee last name:',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'Please provide the employee role ID:',
            name: 'roleId'
        },
        {
            type: 'input',
            message: 'Please provide the employee manager ID:',
            name: 'managerId'
        },
    ]).then((answer) => {
        db.query(`INSERT INTO roles (name) VALUES 
        ('${answer.firstName}', '${answer.lastName}', ${answer.roleId}, ${answer.managerId})`)
    }).then(() => {
        console.log('New Role Added');
        startPrompt();
    })
    .catch((err) => {
        console.log(err);
        startPrompt();
    });
};

const updateEmployeeRole = () => {

};

