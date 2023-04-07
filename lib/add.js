const table = require('console.table');
const inquirer = require('inquirer');

// Function to add a new department
const addDepartment = (db, startPrompt) => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please provide the name of the new department:',
            name: 'newDepartment'
        }
    ]).then((answer) => {
        db.query(`INSERT INTO departments (name) VALUES ('${answer.newDepartment}')`)
    }).then(() => {
        console.log('Department Added!');
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
// Function to add a new role
const addRole = (db, startPrompt) => {
    // Query the departments table to get the department names for the user to choose from
    db.query(`SELECT * FROM departments`, (err, deptData) => {
        let departments = deptData.map(dept => dept.name);

        // prompt user for new role information
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
                type: 'list',
                message: 'Please select the department for the new role:',
                name: 'newRoleDept',
                choices: departments
            },
        ]).then((answer) => {
            // Get the department ID based on the selected department name
            selectedDept = deptData.find(dept => dept.name === answer.newRoleDept);
            // Insert the new role into the roles table with the selected department ID
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES 
                ('${answer.newRoleTitle}', ${answer.newRoleSalary}, ${selectedDept.id})`)
        }).then(() => {
            console.log('New Role Added!');
            startPrompt();
        })
            .catch((err) => {
                console.log(err);
                startPrompt();
            });


    })
};
// Function to add a new employee
const addEmployee = (db, startPrompt) => {
    // Query the roles and employee table to get the role and manager names for the user to choose from
    db.query(`SELECT * FROM roles`, (err, roleData) => {
        db.query(`SELECT * FROM employee`, (err, employeeData) => {

            let roles = roleData.map((role) => role.title);
            let managers = employeeData.map((manager) => `${manager.first_name} ${manager.last_name}`);
            // Function to prompt user for new role information
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
                    type: 'list',
                    message: 'Please select the employee role:',
                    name: 'role',
                    choices: roles
                },
                {
                    type: 'list',
                    message: 'Please select the employee manager:',
                    name: 'manager',
                    choices: managers
                },
            ])
                .then((answer) => {
                    // Get the role and manager from the user answers
                    selectedRole = roleData.find(role => role.title === answer.role);
                    selectedManager = employeeData.find(manager => `${manager.first_name} ${manager.last_name}` === answer.manager);
                    // Insert the new employee data into the database
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
                    ('${answer.firstName}', '${answer.lastName}', ${selectedRole.id}, ${selectedManager.id})`, (err) => {
                        if (err) {
                            console.log(err);
                            startPrompt();
                            return;
                        }
                        console.log('New Employee Added!');
                        startPrompt();
                    });
                })
                .catch((err) => {
                    console.log(err);
                    startPrompt();
                });
        });
    });
};

module.exports = { addDepartment, addEmployee, addRole };