const table = require('console.table');
// Function to view all departments
const viewDepartments = (db, startPrompt) => {
    db.query(`SELECT id AS 'Department Id',
            name AS 'Department Name'
            FROM departments`,
        (err, results) => {
            console.table(results);
            startPrompt();
        })
};
// Function to view all roles
const viewRoles = (db, startPrompt) => {
    db.query(`SELECT roles.id AS 'Role Id', 
    roles.title AS 'Job Title', 
    roles.salary AS 'Salary', 
    departments.name AS 'Department Name' 
    FROM roles 
    JOIN departments ON roles.department_id = departments.id`,
        (err, results) => {
            console.table(results);
            startPrompt();
        })
};
// Function to view all employees
const viewEmployees = (db, startPrompt) => {
    db.query(`SELECT employee.id AS 'Employee Id', 
            employee.first_name AS 'First Name', 
            employee.last_name AS 'Last Name', 
            roles.title AS 'Job Title', 
            roles.salary AS 'Salary', 
            CONCAT(m.first_name, ' ', m.last_name) AS 'Manager' 
              FROM employee
              JOIN roles ON employee.role_id = roles.id
              LEFT JOIN employee m ON employee.manager_id = m.id;`,
        (err, results) => {
            if (err) {
                console.error(err);
            } else {
                console.table(results);
            }
            startPrompt();
        });
};

module.exports = { viewDepartments, viewEmployees, viewRoles };