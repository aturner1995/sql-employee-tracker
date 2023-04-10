const table = require('console.table');
const inquirer = require('inquirer');

const deleteDepartment = (db, startPrompt) => {
    db.query(`SELECT * FROM departments`, (err, deptData) => {
        let departments = deptData.map(dept => dept.name);

        inquirer.prompt([
            {
                type: 'list',
                message: 'Please select the department to delete:',
                choices: departments,
                name: 'dept'
            },
        ])
        .then((answer) => {
            // Get the department ID based on the selected department name
            selectedDept = deptData.find(dept => dept.name === answer.dept);
            
            // Delete all roles that belong to the selected department
            db.query(`DELETE FROM roles WHERE department_id = ?`, selectedDept.id, (err, result) => {
                if (err) {
                    console.error(err);
                    startPrompt();
                } else {
                    // Delete the department itself
                    db.query(`DELETE FROM departments WHERE id = ?`, selectedDept.id, (err, result) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log('Department Deleted');
                        }
                        startPrompt();
                    });
                }
            });
        })
        .catch((err) => {
            console.log(err);
            startPrompt();
        });
    });
};

const deleteRole = (db, startPrompt) => {
    db.query(`SELECT * FROM roles`, (err, roleData) => {
        let roles = roleData.map(role => role.title);

        inquirer.prompt([
            {
                type: 'list',
                message: 'Please select the role to delete:',
                choices: roles,
                name: 'role'
            }
        ])
        .then((answer) => {
            // Get the role ID based on the selected role title
            selectedRole = roleData.find(role => role.title === answer.role);

            // Delete the role from the database
            db.query(`DELETE FROM roles WHERE id = ?`, selectedRole.id, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Role deleted successfully');
                }
                startPrompt();
            });
        })
        .catch((err) => {
            console.log(err);
            startPrompt();
        });
    });
};

const deleteEmployee = (db, startPrompt) => {
    db.query(`SELECT * FROM employee`, (err, employeeData) => {
        let employees = employeeData.map(employee => `${employee.first_name} ${employee.last_name}`);

        inquirer.prompt([
            {
                type: 'list',
                message: 'Please select the employee to delete:',
                choices: employees,
                name: 'employee'
            }
        ])
        .then((answer) => {
            // Get the employee ID based on the selected employee name
            selectedEmployee = employeeData.find(employee => `${employee.first_name} ${employee.last_name}` === answer.employee);

            // Delete the employee from the database
            db.query(`DELETE FROM employee WHERE id = ?`, selectedEmployee.id, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Employee deleted successfully');
                }
                startPrompt();
            });
        })
        .catch((err) => {
            console.log(err);
            startPrompt();
        });
    });
};



module.exports = {deleteDepartment, deleteRole, deleteEmployee};
