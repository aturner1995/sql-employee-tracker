const table = require('console.table');
const inquirer = require('inquirer');
// Function to update and employee role
const updateEmployeeRole = (db, startPrompt) => {
    db.query(`SELECT * FROM employee`, (err, employeeData) => {
        db.query(`SELECT * FROM roles`, (err, roleData) => {
            // Query theemployee and roles table to get the employee and role names for the user to choose from
            let employees = employeeData.map((employee) => `${employee.first_name} ${employee.last_name}`);
            let roles = roleData.map((role) => role.title);
            // prompt the user
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Select the employee to update:',
                    name: 'employeeUpdate',
                    choices: employees
                },
                {
                    type: 'list',
                    message: 'Select the employees new role:',
                    name: 'roleUpdate',
                    choices: roles
                },
            ])
                .then((answer) => {
                    selectedRole = roleData.find(role => role.title === answer.roleUpdate);
                    selectedEmployee = employeeData.find(employee => `${employee.first_name} ${employee.last_name}` === answer.employeeUpdate);
                    db.query(`UPDATE employee SET role_id = ? where ID = ?`, [selectedRole.id, selectedEmployee.id], (err) => {
                        if (err) {
                            throw err;
                        }
                        console.log("Employee Updated!");
                        startPrompt();
                    });
                })

        })
    })
};
// Function to update and employee manager
const updateEmployeeManager = (db, startPrompt) => {
    db.query(`SELECT * FROM employee`, (err, employeeData) => {
        // Query the employee and roles table to get the employee and manager names for the user to choose from
        let employees = employeeData.map((employee) => `${employee.first_name} ${employee.last_name}`);
        let managers = employeeData.map((manager) => `${manager.first_name} ${manager.last_name}`);
        // prompt the user
        inquirer.prompt([
            {
                type: 'list',
                message: 'Select the employee to update:',
                name: 'employeeUpdate',
                choices: employees
            },
            {
                type: 'list',
                message: 'Select the employees new manager:',
                name: 'managerUpdate',
                choices: managers
            },
        ])
            .then((answer) => {
                selectedManager = employeeData.find(manager => `${manager.first_name} ${manager.last_name}` === answer.managerUpdate);
                selectedEmployee = employeeData.find(employee => `${employee.first_name} ${employee.last_name}` === answer.employeeUpdate);
                db.query(`UPDATE employee SET manager_id = ? where ID = ?`, [selectedManager.id, selectedEmployee.id], (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Employee Updated!");
                    startPrompt();
                });
            })
    })
};

module.exports = { updateEmployeeRole, updateEmployeeManager };